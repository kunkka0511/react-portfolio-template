import fs from "fs";
import { join } from "path";

export default function handler(req, res) {
  const portfolioPath = join(process.cwd(), "data", "portfolio.json");

  if (process.env.NODE_ENV !== "development") {
    return res
      .status(403)
      .json({ message: "Editing allowed only in development mode" });
  }

  if (req.method === "POST") {
    try {
      fs.writeFileSync(
        portfolioPath,
        JSON.stringify(req.body, null, 2),
        "utf8"
      );

      return res.status(200).json({
        message: "Portfolio saved successfully",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to save portfolio data",
      });
    }
  }

  return res.status(200).json({
    message: "API route working",
  });
}