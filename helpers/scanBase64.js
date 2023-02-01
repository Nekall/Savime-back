import fetch from "node-fetch";
const { VIRUSTOTAL_API_KEY } = process.env;

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const scanReport = async (resource, count = 0) => {
  if (count > 5) return false;
  const response = await fetch(
    `https://www.virustotal.com/vtapi/v2/file/report?apikey=${VIRUSTOTAL_API_KEY}&resource=${resource}`,
    { method: "GET" }
  );
  const json = await response.json();

  if (json.response_code === 1) {
    return json.positives === 0;
  }

  console.log("Restarting scanReport. . .");
  await sleep(15000);
  return scanReport(resource, count + 1);
};

export const scanBase64 = async (base64str) => {
  const form = new URLSearchParams({
    apikey: VIRUSTOTAL_API_KEY,
    file: base64str,
  });

  const response = await fetch(
    "https://www.virustotal.com/vtapi/v2/file/scan",
    {
      method: "POST",
      body: form,
    }
  );
  const json = await response.json();
  return scanReport(json.resource);
};
