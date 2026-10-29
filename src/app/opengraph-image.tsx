import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const runtime = "edge";
export const alt = "Dhruv Jain — Full-Stack Developer & AI Systems Builder";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0d0d0d",
          backgroundImage: "radial-gradient(circle at 25px 25px, #1f1f1f 2%, transparent 0%)",
          backgroundSize: "40px 40px",
          padding: "80px",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#a3a3a3",
            }}
          >
            {profile.nickname} • Portfolio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {profile.name}
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#38bdf8",
              margin: 0,
              fontWeight: 500,
            }}
          >
            {profile.role}
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "#a3a3a3",
              maxWidth: "850px",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {profile.headline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #262626",
            paddingTop: "32px",
            fontSize: "20px",
            color: "#737373",
          }}
        >
          <span>VIT Vellore • B.Tech IT</span>
          <span>drv-dev.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
