import SftpClient from "ssh2-sftp-client";

export async function tailLatestLog(lines = 50): Promise<string[]> {
  const client = new SftpClient();
  await client.connect({
    host: process.env.SFTP_HOST!,
    username: process.env.SFTP_USER!,
    password: process.env.SFTP_PASS!
  });

  try {
    const path = process.env.SFTP_LOG_PATH!;
    const content = await client.get(path) as Buffer;
    const text = content.toString("utf8");
    const arr = text.split(/\r?\n/);
    return arr.slice(-lines);
  } finally {
    await client.end();
  }
}
