import { fontFamily, loadFont } from "@remotion/google-fonts/Manrope";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { CompositionProps } from "../../../types/constants";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800"],
});

const palette = {
  surface: "#faf9f5",
  section: "#f2f1eb",
  card: "#ffffff",
  primary: "#003527",
  primarySoft: "#0d5b46",
  sage: "#d8e5dc",
  sand: "#efe6d8",
  ink: "#173128",
  muted: "#61756a",
  accent: "#ff8b52",
  alert: "#de6752",
};

const imageStyle = (scale: number, translateX = 0, translateY = 0): React.CSSProperties => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
});

const GlassCard: React.FC<{
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ style, children }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(18px)",
        borderRadius: 34,
        boxShadow: "0 18px 45px rgba(20, 36, 29, 0.08)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const StatCard: React.FC<{
  value: string;
  label: string;
  frame: number;
  top: number;
  left: number;
  width?: number;
  tone?: "primary" | "accent";
}> = ({ value, label, frame, top, left, width = 250, tone = "primary" }) => {
  const entrance = spring({
    fps: 30,
    frame,
    config: {
      damping: 18,
      mass: 0.9,
    },
  });

  return (
    <GlassCard
      style={{
        position: "absolute",
        width,
        top,
        left,
        padding: "24px 26px",
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [40, 0])}px) scale(${interpolate(entrance, [0, 1], [0.96, 1])})`,
      }}
    >
      <div
        style={{
          color: tone === "accent" ? palette.accent : palette.primary,
          fontSize: 48,
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {value}
      </div>
      <div
        style={{
          color: palette.muted,
          fontSize: 20,
          lineHeight: 1.35,
        }}
      >
        {label}
      </div>
    </GlassCard>
  );
};

const StepCard: React.FC<{
  number: string;
  title: string;
  body: string;
  frame: number;
  top: number;
  left: number;
}> = ({ number, title, body, frame, top, left }) => {
  const entrance = spring({
    fps: 30,
    frame,
    config: {
      damping: 17,
      mass: 0.8,
    },
  });

  return (
    <GlassCard
      style={{
        position: "absolute",
        top,
        left,
        width: 286,
        minHeight: 220,
        padding: "28px 28px 30px",
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [28, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 999,
          backgroundColor: palette.sage,
          color: palette.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        {number}
      </div>
      <div
        style={{
          color: palette.ink,
          fontSize: 28,
          lineHeight: 1.1,
          fontWeight: 700,
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: palette.muted,
          fontSize: 20,
          lineHeight: 1.4,
        }}
      >
        {body}
      </div>
    </GlassCard>
  );
};

const PhoneFrame: React.FC<{
  src: string;
  frame: number;
  left: number;
  top: number;
  scale?: number;
  rotate?: number;
}> = ({ src, frame, left, top, scale = 1, rotate = 0 }) => {
  const entrance = spring({
    fps: 30,
    frame,
    config: {
      damping: 16,
      mass: 0.8,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 290,
        height: 565,
        borderRadius: 42,
        padding: 14,
        background: "linear-gradient(180deg, #173128 0%, #021b14 100%)",
        boxShadow: "0 28px 80px rgba(10, 25, 19, 0.24)",
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [55, 0])}px) rotate(${rotate}deg) scale(${interpolate(entrance, [0, 1], [scale * 0.92, scale])})`,
      }}
    >
      <div
        style={{
          width: 84,
          height: 14,
          borderRadius: 999,
          backgroundColor: "#0b261d",
          position: "absolute",
          left: "50%",
          top: 11,
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 30,
          backgroundColor: palette.card,
        }}
      >
        <Img src={src} style={imageStyle(1.015)} />
      </div>
    </div>
  );
};

const CopyBlock: React.FC<{
  kicker: string;
  title: string;
  body: string;
  frame: number;
  top: number;
  left: number;
  width: number;
}> = ({ kicker, title, body, frame, top, left, width }) => {
  const entrance = spring({
    fps: 30,
    frame,
    config: {
      damping: 18,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          color: palette.primarySoft,
          fontSize: 18,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 18,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          color: palette.ink,
          fontSize: 64,
          lineHeight: 1,
          fontWeight: 800,
          whiteSpace: "pre-line",
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: palette.muted,
          fontSize: 25,
          lineHeight: 1.4,
          maxWidth: width,
        }}
      >
        {body}
      </div>
    </div>
  );
};

const FeaturePill: React.FC<{
  label: string;
  value: string;
  frame: number;
  top: number;
  left: number;
}> = ({ label, value, frame, top, left }) => {
  const entrance = spring({
    fps: 30,
    frame,
    config: {
      damping: 16,
      mass: 0.7,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: 256,
        padding: "18px 20px",
        borderRadius: 28,
        backgroundColor: entrance > 0.5 ? palette.card : "rgba(255,255,255,0.6)",
        boxShadow: "0 12px 35px rgba(20, 36, 29, 0.06)",
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [24, 0])}px)`,
      }}
    >
      <div
        style={{
          color: palette.muted,
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: palette.ink,
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
    </div>
  );
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const audioFadeOut = interpolate(
    frame,
    [durationInFrames - fps * 2, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at top left, rgba(216,229,220,0.85), transparent 34%), radial-gradient(circle at bottom right, rgba(239,230,216,0.95), transparent 38%), linear-gradient(135deg, #faf9f5 0%, #f2f1eb 100%)",
        fontFamily,
      }}
    >
      <Audio src={staticFile("Fun & Upbeat Background Music For Advertising Videos [Royalty Free - Commercial Use] [KhZLU-Hge-c].mp3")} volume={0.22 * audioFadeOut} />

      <div
        style={{
          position: "absolute",
          inset: 24,
          borderRadius: 40,
          border: "1px solid rgba(0, 53, 39, 0.06)",
        }}
      />

      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill>
          <CopyBlock
            kicker="Filipino-First Finance"
            title={"A budget system\nbuilt for how Filipinos\nactually live."}
            body="Odin turns manual logging into clear, profile-aware guidance for income, obligations, savings, debt, and future spending."
            frame={frame}
            top={92}
            left={84}
            width={560}
          />
          <GlassCard
            style={{
              position: "absolute",
              right: 74,
              top: 68,
              width: 532,
              height: 590,
              padding: 28,
              backgroundColor: "rgba(0,53,39,0.95)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 26,
                background:
                  "radial-gradient(circle at top left, rgba(255,255,255,0.12), transparent 35%), linear-gradient(160deg, #053d2d 0%, #03251c 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  borderRadius: 999,
                  backgroundColor: "#0f6a51",
                  left: 48,
                  top: 56,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 84,
                  height: 84,
                  borderRadius: 22,
                  backgroundColor: "#d9ebe0",
                  left: 81,
                  top: 89,
                  transform: "rotate(45deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 228,
                  top: 88,
                  color: "#f5f6f2",
                  fontSize: 84,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Odin
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 54,
                  right: 54,
                  top: 258,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  "Variable income aware",
                  "Protected categories",
                  "Forecast + alert engine",
                  "Savings and debt strategy",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      borderRadius: 22,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      padding: "18px 18px",
                      color: "#d9ebe0",
                      fontSize: 22,
                      lineHeight: 1.2,
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 54,
                  bottom: 54,
                  color: "rgba(245,246,242,0.78)",
                  fontSize: 22,
                  lineHeight: 1.4,
                  maxWidth: 390,
                }}
              >
                Calm, editorial, and grounded in Filipino budgeting realities.
              </div>
            </div>
          </GlassCard>
          <FeaturePill label="Tagline" value={title} frame={frame - 12} top={540} left={86} />
          <FeaturePill label="Positioning" value="Decision support, not generic tracking" frame={frame - 18} top={540} left={356} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={90} durationInFrames={120}>
        <AbsoluteFill>
          <CopyBlock
            kicker="Why It Exists"
            title={"Local budgeting\nneeds local logic."}
            body="The product thesis is direct: western-first trackers miss Filipino income variability, family obligations, protected expenses, and culturally cyclical spending."
            frame={frame - 90}
            top={82}
            left={82}
            width={468}
          />
          <StatCard
            value="22.2%"
            label="still manage money with a notebook or spreadsheet"
            frame={frame - 84}
            top={118}
            left={694}
            width={230}
            tone="accent"
          />
          <StatCard
            value="57.8%"
            label="reported using no dedicated budgeting tool at all"
            frame={frame - 78}
            top={118}
            left={952}
            width={244}
            tone="accent"
          />
          <GlassCard
            style={{
              position: "absolute",
              top: 364,
              left: 694,
              width: 502,
              padding: "26px 28px",
            }}
          >
            <div style={{ color: palette.primary, fontSize: 18, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
              Gap In Current Tools
            </div>
            <div style={{ color: palette.ink, fontSize: 34, lineHeight: 1.08, fontWeight: 700, marginBottom: 16 }}>
              Western-first budgeting patterns do not map cleanly to Filipino obligations.
            </div>
            <div style={{ color: palette.muted, fontSize: 21, lineHeight: 1.45 }}>
              Odin accounts for family support, community contributions, variable pay cycles, and protected essentials before recommending where cuts should happen.
            </div>
          </GlassCard>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={210} durationInFrames={90}>
        <AbsoluteFill>
          <CopyBlock
            kicker="The Promise"
            title={"Smart budgets for\nall incomes and\nobligations."}
            body="Odin is framed as a calm financial control room: explainable guidance, protected categories, and room for real Filipino priorities."
            frame={frame - 210}
            top={94}
            left={84}
            width={470}
          />
          <FeaturePill label="Budget Suggestion" value="Explainable allocations, not blind automation" frame={frame - 206} top={108} left={692} />
          <FeaturePill label="Behavioral Profile" value="Stable or variable income, flexible or obligated spending" frame={frame - 198} top={232} left={914} />
          <FeaturePill label="Forecasting" value="Cold-start guidance that improves as logging continues" frame={frame - 190} top={356} left={692} />
          <FeaturePill label="Savings + Debt" value="Avalanche and Snowball strategy support" frame={frame - 182} top={480} left={914} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={300} durationInFrames={120}>
        <AbsoluteFill>
          <CopyBlock
            kicker="How It Works"
            title={"Log it.\nLearn it.\nForecast it."}
            body="The user records expenses, Odin learns the pattern, and the next budget period becomes easier to plan."
            frame={frame - 300}
            top={102}
            left={88}
            width={360}
          />
          <StepCard
            number="1"
            title="Capture"
            body="Income, expenses, transfers, and recurring activity are logged with Filipino-relevant categories."
            frame={frame - 296}
            top={120}
            left={520}
          />
          <StepCard
            number="2"
            title="Interpret"
            body="Odin classifies behavior, protects essential spending, and learns emerging patterns from the ledger."
            frame={frame - 286}
            top={250}
            left={776}
          />
          <StepCard
            number="3"
            title="Guide"
            body="Budgets, alerts, savings targets, debt plans, and next-period forecasts become actionable."
            frame={frame - 276}
            top={380}
            left={1032 - 260}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={420} durationInFrames={270}>
        <AbsoluteFill>
          <CopyBlock
            kicker="Inside The App"
            title={"A dashboard that\nstays useful after\nentry day."}
            body="The system keeps earning attention with budget status, transaction history, recommendations, anomaly alerts, and cash-position visibility."
            frame={frame - 420}
            top={72}
            left={70}
            width={390}
          />
          <PhoneFrame src={staticFile("dashboard.png")} frame={frame - 416} left={480} top={94} rotate={-5} scale={0.96} />
          <PhoneFrame src={staticFile("add-transaction.png")} frame={frame - 404} left={680} top={136} rotate={3} scale={0.89} />
          <PhoneFrame src={staticFile("history.png")} frame={frame - 394} left={876} top={110} rotate={5} scale={0.93} />
          <GlassCard
            style={{
              position: "absolute",
              left: 74,
              top: 516,
              width: 352,
              padding: "24px 26px",
            }}
          >
            <div style={{ color: palette.muted, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 8 }}>
              Product Value
            </div>
            <div style={{ color: palette.ink, fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>
              Fast logging with immediate dashboard payoff.
            </div>
          </GlassCard>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={690} durationInFrames={120}>
        <AbsoluteFill>
          <CopyBlock
            kicker="Intelligence Layer"
            title={"Recommendations,\nforecasting, alerts,\nsavings, debt."}
            body="Random Forest profiles behavior, Linear Programming recommends budgets, LSTM forecasts spend, and Isolation Forest flags unusual activity."
            frame={frame - 690}
            top={72}
            left={78}
            width={442}
          />
          <PhoneFrame src={staticFile("budget-recommendation.png")} frame={frame - 686} left={544} top={74} rotate={-4} scale={0.9} />
          <PhoneFrame src={staticFile("assistant.png")} frame={frame - 676} left={734} top={138} rotate={1} scale={0.84} />
          <PhoneFrame src={staticFile("savings-debt.png")} frame={frame - 666} left={926} top={96} rotate={4} scale={0.9} />
          <FeaturePill label="Protected" value="Essential categories stay defended first" frame={frame - 660} top={534} left={530} />
          <FeaturePill label="Cold Start" value="Useful guidance even before history is rich" frame={frame - 650} top={534} left={804} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={810} durationInFrames={90}>
        <AbsoluteFill>
          <GlassCard
            style={{
              position: "absolute",
              left: 74,
              top: 72,
              width: 448,
              height: 574,
              padding: 18,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 26,
                overflow: "hidden",
                background:
                  "radial-gradient(circle at 20% 20%, rgba(216,229,220,0.9), transparent 28%), radial-gradient(circle at 100% 100%, rgba(239,230,216,0.95), transparent 36%), linear-gradient(140deg, #f7f6f1 0%, #ebe8de 100%)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 52,
                  top: 58,
                  width: 118,
                  height: 118,
                  borderRadius: 999,
                  backgroundColor: palette.primary,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 86,
                  top: 92,
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: palette.sage,
                  transform: "rotate(45deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 52,
                  top: 222,
                  right: 50,
                  color: palette.primary,
                  fontSize: 60,
                  fontWeight: 800,
                  lineHeight: 0.92,
                }}
              >
                Odin makes truly Filipino budgets.
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 52,
                  right: 52,
                  bottom: 56,
                  color: palette.muted,
                  fontSize: 22,
                  lineHeight: 1.4,
                }}
              >
                Built around Filipino realities: variable income, family obligations, protected essentials, and forward-looking guidance.
              </div>
            </div>
          </GlassCard>
          <div
            style={{
              position: "absolute",
              top: 132,
              left: 592,
              right: 84,
              color: palette.ink,
            }}
          >
            <div
              style={{
                color: palette.primarySoft,
                fontSize: 18,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 22,
              }}
            >
              Final Statement
            </div>
            <div
              style={{
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 0.95,
                whiteSpace: "pre-line",
                marginBottom: 24,
              }}
            >
              {title.replace(" truly Filipino ", "\ntruly Filipino\n")}
            </div>
            <div
              style={{
                color: palette.muted,
                fontSize: 24,
                lineHeight: 1.4,
                maxWidth: 520,
              }}
            >
              A promotional cut built from the thesis deck, UI captures, and the Odin product story inside this repo.
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
