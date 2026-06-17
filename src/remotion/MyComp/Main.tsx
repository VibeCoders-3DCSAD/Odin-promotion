import { fontFamily, loadFont } from "@remotion/google-fonts/Manrope";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  entranceDir,
  useCounter,
  useSpringEntrance,
} from "./animation";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800"],
});

const c = {
  pine: "#003527",
  pineDeep: "#002118",
  pineSoft: "#0d5b46",
  sage: "#d8e5dc",
  sand: "#efe6d8",
  cream: "#f5f2eb",
  paper: "#faf9f5",
  ink: "#173128",
  muted: "#61756a",
  orange: "#ff8b52",
  card: "#ffffff",
};

const SLIDE_DURATION = 135;
const OVERLAP = 12;

const STARTS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (i) => i * (SLIDE_DURATION - OVERLAP),
);

export const TOTAL_DURATION =
  STARTS[STARTS.length - 1] + SLIDE_DURATION;

const BC = {
  dark: `linear-gradient(135deg, ${c.pineDeep} 0%, ${c.pine} 100%)`,
  warm: `linear-gradient(135deg, ${c.cream} 0%, ${c.sand} 100%)`,
  light: `linear-gradient(135deg, ${c.paper} 0%, ${c.cream} 100%)`,
};

const MEDIA_STAGE_WIDTH = 360;
const MEDIA_STAGE_HEIGHT = 560;

const SlideWrap: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, OVERLAP, SLIDE_DURATION - OVERLAP, SLIDE_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const SplitSlide: React.FC<{
  background: string;
  mediaSide?: "left" | "right";
  textWidth?: number;
  mediaWidth?: number;
  gap?: number;
  children: React.ReactNode;
  media?: React.ReactNode;
}> = ({
  background,
  mediaSide = "right",
  textWidth = 500,
  mediaWidth = MEDIA_STAGE_WIDTH,
  gap = 64,
  children,
  media,
}) => {
  return (
    <AbsoluteFill
      style={{
        background,
        padding: "56px 56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          display: "flex",
          flexDirection: mediaSide === "left" ? "row" : "row-reverse",
          alignItems: "center",
          justifyContent: "center",
          gap,
        }}
      >
        <div
          style={{
            width: mediaWidth,
            minWidth: mediaWidth,
            display: "flex",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {media}
        </div>
        <div
          style={{
            width: textWidth,
            minWidth: textWidth,
            position: "relative",
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MediaStage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
        width: MEDIA_STAGE_WIDTH,
        height: MEDIA_STAGE_HEIGHT,
      }}
    >
      {children}
    </div>
  );
};

const PhoneFrame: React.FC<{
  src: string;
  delay: number;
  anchor?: "top" | "middle" | "bottom";
  x?: number;
  scale?: number;
  rotate?: number;
  entranceFrom?: "up" | "down";
}> = ({
  src,
  delay,
  anchor = "middle",
  x = 0,
  scale = 1,
  rotate = 0,
  entranceFrom = "up",
}) => {
  const e = useSpringEntrance(delay, { damping: 14, mass: 1.1 });
  const top =
    anchor === "top"
      ? 0
      : anchor === "bottom"
        ? MEDIA_STAGE_HEIGHT - 506
        : (MEDIA_STAGE_HEIGHT - 506) / 2;
  const left = (MEDIA_STAGE_WIDTH - 260) / 2 + x;
  const translateY = interpolate(
    e,
    [0, 1],
    entranceFrom === "up" ? [80, 0] : [-80, 0],
  );

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 260,
        height: 506,
        opacity: e,
        transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${interpolate(e, [0, 1], [scale * 0.9, scale])})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -18,
          borderRadius: 42,
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,139,82,0.18) 0%, rgba(255,139,82,0.08) 35%, rgba(255,255,255,0) 72%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: 38,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 32,
          padding: 9,
          background: "linear-gradient(180deg, #173128 0%, #021b14 100%)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 10,
            borderRadius: 999,
            backgroundColor: "#0b261d",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 8,
            zIndex: 2,
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: c.card,
          }}
        >
          <Img
            src={src}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

const DisplayNumber: React.FC<{
  value: number;
  suffix: string;
  delay: number;
  color: string;
  fontSize?: number;
}> = ({ value, suffix, delay, color, fontSize = 100 }) => {
  const count = useCounter(delay, value, 28);
  const e = useSpringEntrance(delay, { damping: 12, mass: 0.8 });
  return (
    <div
      style={{
        opacity: e,
        transform: `scale(${interpolate(e, [0, 1], [0.5, 1])})`,
        color,
        fontSize,
        fontWeight: 800,
        lineHeight: 0.84,
        letterSpacing: "-0.04em",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      {count.toFixed(value % 1 === 0 ? 0 : 1)}
      {suffix}
    </div>
  );
};

const TextBlock: React.FC<{
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "down" | "left" | "right" | "scale" | "scaleUp";
  style?: React.CSSProperties;
}> = ({ children, delay = 0, dir = "up", style }) => {
  const e = useSpringEntrance(delay);
  return (
    <div style={{ ...entranceDir(e, dir), ...style }}>{children}</div>
  );
};

const SlideLogo: React.FC = () => {
  const eLogo = useSpringEntrance(0, { damping: 10, mass: 0.7 });
  const eWordmark = useSpringEntrance(16, { damping: 10, mass: 0.6 });

  return (
    <AbsoluteFill
      style={{
        background: BC.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <div
          style={{
            ...entranceDir(eLogo, "scale"),
            width: 88,
            height: 88,
            borderRadius: 24,
            background: c.card,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxShadow: "0 16px 44px rgba(0,0,0,0.18)",
          }}
        >
          <Img
            src={staticFile("logo1.png")}
            style={{
              width: 76,
              height: 76,
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            ...entranceDir(eWordmark, "up"),
            fontSize: 88,
            fontWeight: 800,
            color: c.card,
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          ODIN
        </div>
      </div>
      <TextBlock delay={32} dir="up">
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: 30,
          }}
        >
          Personal Finance Management System
        </div>
      </TextBlock>
      <TextBlock delay={42} dir="scale">
        <div
          style={{
            width: 80,
            height: 3,
            borderRadius: 4,
            backgroundColor: c.sage,
            marginTop: 24,
          }}
        />
      </TextBlock>
    </AbsoluteFill>
  );
};

const SlideTagline: React.FC = () => {
  const e1 = useSpringEntrance(0, { damping: 12, mass: 0.8 });
  const e2 = useSpringEntrance(12);
  const e3 = useSpringEntrance(24, { damping: 10, mass: 0.7 });
  const e4 = useSpringEntrance(36);

  return (
    <SplitSlide
      background={BC.dark}
      textWidth={560}
      mediaWidth={300}
      gap={28}
      media={
        <MediaStage>
          <PhoneFrame
            src={staticFile("budget-recommendation.png")}
            delay={20}
            anchor="bottom"
            x={-64}
            scale={1.14}
            rotate={3}
            entranceFrom="up"
          />
        </MediaStage>
      }
    >
      <div>
        <div
          style={{
            ...entranceDir(e1, "up"),
            fontSize: 30,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.06em",
            marginBottom: 18,
          }}
        >
          &ldquo;A personal finance system&rdquo;
        </div>
        <div
          style={{
            ...entranceDir(e2, "right"),
            fontSize: 38,
            fontWeight: 700,
            color: c.sage,
            letterSpacing: "0.04em",
            marginBottom: 18,
          }}
        >
          built for how
        </div>
        <div
          style={{
            ...entranceDir(e3, "left"),
            fontSize: 60,
            fontWeight: 800,
            color: c.card,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            width: 400,
          }}
        >
          Filipinos
          <br />
          actually live.
        </div>
        <div
          style={{
            ...entranceDir(e4, "up"),
            width: 60,
            height: 3,
            borderRadius: 4,
            backgroundColor: c.orange,
            margin: "24px 0 0",
          }}
        />
      </div>
    </SplitSlide>
  );
};

const SlideProblem: React.FC = () => {
  const e1 = useSpringEntrance(0);
  const e2 = useSpringEntrance(14, { damping: 10, mass: 0.9 });
  const e3 = useSpringEntrance(28);

  return (
    <SplitSlide
      background={BC.warm}
      mediaSide="left"
      textWidth={500}
      media={
        <MediaStage>
          <PhoneFrame
            src={staticFile("add-transaction.png")}
            delay={16}
            anchor="top"
            x={18}
            rotate={-4}
            entranceFrom="down"
          />
        </MediaStage>
      }
    >
      <div>
        <div
          style={{
            ...entranceDir(e1, "down"),
            fontSize: 28,
            fontWeight: 500,
            color: c.muted,
            marginBottom: 28,
          }}
        >
          Budget apps exist.
        </div>
        <div
          style={{
            ...entranceDir(e2, "scale"),
            fontSize: 52,
            fontWeight: 800,
            color: c.pine,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          But none fit
          <br />
          <span style={{ color: c.orange }}>Filipino realities</span>.
        </div>
        <div
          style={{
            ...entranceDir(e3, "up"),
            fontSize: 20,
            fontWeight: 400,
            color: c.muted,
            lineHeight: 1.5,
            width: 400,
          }}
        >
          The right kind of budgeting guidance doesn&apos;t exist locally.
        </div>
      </div>
    </SplitSlide>
  );
};

const SlideGap: React.FC = () => {
  const eTitle = useSpringEntrance(0);
  const e1 = useSpringEntrance(10, { damping: 13, mass: 0.9 });
  const e2 = useSpringEntrance(20, { damping: 13, mass: 0.9 });
  const e3 = useSpringEntrance(30, { damping: 13, mass: 0.9 });

  const chip = (e: number, label: string, desc: string) => (
    <div
      style={{
        ...entranceDir(e, "right"),
        padding: "16px 20px",
        borderRadius: 18,
        backgroundColor: c.card,
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        width: 280,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: c.orange,
          marginBottom: 8,
        }}
      />
      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: c.ink,
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: c.muted,
          lineHeight: 1.4,
        }}
      >
        {desc}
      </div>
    </div>
  );

  return (
    <SplitSlide
      background={BC.warm}
      textWidth={560}
      gap={40}
      media={
        <MediaStage>
          <PhoneFrame
            src={staticFile("history.png")}
            delay={24}
            anchor="middle"
            x={8}
            rotate={4}
            entranceFrom="down"
          />
        </MediaStage>
      }
    >
      <div>
        <div
          style={{
            ...entranceDir(eTitle, "up"),
            fontSize: 34,
            fontWeight: 800,
            color: c.pine,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 24,
            width: 280,
          }}
        >
          Majority of finance
          <br />
          management apps miss:
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {chip(e1, "Variable Income", "Freelance, commissions, irregular pay cycles")}
          {chip(e2, "Family Obligations", "Padala and support for parents, siblings, and relatives")}
          {chip(e3, "Cultural Spending", "Paluwagan, handaan, fiestas, and community giving")}
        </div>
      </div>
    </SplitSlide>
  );
};

const SlideStats: React.FC = () => {
  const eLabel1 = useSpringEntrance(18);
  const eLabel2 = useSpringEntrance(18);
  const eKicker = useSpringEntrance(0, { damping: 10, mass: 0.8 });
  const eNote = useSpringEntrance(28, { damping: 10, mass: 0.8 });

  return (
    <SplitSlide
      background={BC.warm}
      mediaSide="left"
      textWidth={620}
      media={
        <MediaStage>
          <PhoneFrame
            src={staticFile("dashboard.png")}
            delay={18}
            anchor="bottom"
            x={20}
            rotate={-3}
            entranceFrom="up"
          />
        </MediaStage>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <div
          style={{
            ...entranceDir(eKicker, "up"),
            fontSize: 22,
            fontWeight: 700,
            color: c.muted,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Survey signal
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
          }}
        >
          <div
            style={{
              padding: "24px 20px",
              borderRadius: 24,
              backgroundColor: c.card,
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              width: 280,
            }}
          >
            <DisplayNumber
              value={22.2}
              suffix="%"
              delay={8}
              color={c.orange}
              fontSize={84}
            />
            <div
              style={{
                ...entranceDir(eLabel1, "up"),
                fontSize: 19,
                fontWeight: 600,
                color: c.ink,
                marginTop: 12,
                textAlign: "center",
                lineHeight: 1.35,
              }}
            >
              still manage money with a notebook or spreadsheet
            </div>
          </div>
          <div
            style={{
              padding: "24px 20px",
              borderRadius: 24,
              backgroundColor: c.card,
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              width: 280,
            }}
          >
            <DisplayNumber
              value={57.8}
              suffix="%"
              delay={8}
              color={c.orange}
              fontSize={84}
            />
            <div
              style={{
                ...entranceDir(eLabel2, "up"),
                fontSize: 19,
                fontWeight: 600,
                color: c.ink,
                marginTop: 12,
                textAlign: "center",
                lineHeight: 1.35,
              }}
            >
              reported using no dedicated budgeting tool
            </div>
          </div>
        </div>
        <div
          style={{
            ...entranceDir(eNote, "up"),
            fontSize: 18,
            lineHeight: 1.45,
            color: c.muted,
            maxWidth: 560,
          }}
        >
          The problem is not budgeting effort. It&apos;s product fit.
        </div>
      </div>
    </SplitSlide>
  );
};

const SlideSolution: React.FC = () => {
  const e1 = useSpringEntrance(0, { damping: 10, mass: 0.8 });
  const e2 = useSpringEntrance(14);
  const e3 = useSpringEntrance(26);

  return (
    <SplitSlide
      background={BC.dark}
      textWidth={430}
      media={
        <MediaStage>
          <PhoneFrame
            src={staticFile("budget-advice.png")}
            delay={18}
            anchor="top"
            x={6}
            rotate={-4}
            entranceFrom="down"
          />
        </MediaStage>
      }
    >
      <div>
        <div
          style={{
            ...entranceDir(e1, "scale"),
            fontSize: 68,
            fontWeight: 800,
            color: c.card,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Odin
        </div>
        <div
          style={{
            ...entranceDir(e2, "down"),
            fontSize: 26,
            fontWeight: 600,
            color: c.sage,
            marginTop: 18,
            letterSpacing: "0.04em",
          }}
        >
          meets Filipinos where they are.
        </div>
        <div
          style={{
            ...entranceDir(e3, "up"),
            fontSize: 19,
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            marginTop: 22,
            lineHeight: 1.5,
          }}
        >
          A calm financial control room with explainable guidance and room
          for real priorities.
        </div>
      </div>
    </SplitSlide>
  );
};

const SlideHowItWorks: React.FC = () => {
  const eLabel = useSpringEntrance(0, { damping: 10, mass: 0.7 });
  const eTitle = useSpringEntrance(6, { damping: 10, mass: 0.7 });
  const eSteps = [
    useSpringEntrance(14, { damping: 11, mass: 0.8 }),
    useSpringEntrance(22, { damping: 11, mass: 0.8 }),
    useSpringEntrance(30, { damping: 11, mass: 0.8 }),
  ];

  const steps = [
    {
      number: "1",
      title: "Capture",
      copy: "Log expenses with Filipino-relevant categories.",
      color: c.pine,
      dir: "left" as const,
    },
    {
      number: "2",
      title: "Learn",
      copy: "Patterns become forecasts, risk signals, and spending context.",
      color: c.pineSoft,
      dir: "up" as const,
    },
    {
      number: "3",
      title: "Guide",
      copy: "Budgets, alerts, and forecasts turn into clear next moves.",
      color: c.orange,
      dir: "right" as const,
    },
  ];

  return (
    <SplitSlide
      background={BC.light}
      mediaSide="left"
      textWidth={620}
      gap={32}
      media={
        <MediaStage>
          <PhoneFrame
            src={staticFile("budget-recommendation.png")}
            delay={20}
            anchor="bottom"
            x={10}
            rotate={2}
            entranceFrom="up"
          />
        </MediaStage>
      }
    >
      <div>
        <div
          style={{
            ...entranceDir(eLabel, "up"),
            fontSize: 20,
            fontWeight: 700,
            color: c.muted,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 24,
          }}
        >
          How It Works
        </div>
        <div
          style={{
            ...entranceDir(eTitle, "up"),
            fontSize: 38,
            fontWeight: 800,
            color: c.ink,
            lineHeight: 1.05,
            marginBottom: 22,
          }}
        >
          From repeated entries to forward-looking advice.
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 14 }}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              style={{
                ...entranceDir(eSteps[i], step.dir),
                padding: "20px 18px",
                borderRadius: 20,
                backgroundColor: c.card,
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                flex: 1,
                minHeight: 190,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  backgroundColor: step.color,
                  color: c.card,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 18,
                  marginBottom: 12,
                }}
              >
                {step.number}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: c.ink,
                  marginBottom: 8,
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: c.muted,
                  lineHeight: 1.45,
                }}
              >
                {step.copy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SplitSlide>
  );
};

const SlideFeature: React.FC = () => {
  const eTitle = useSpringEntrance(0, { damping: 11, mass: 0.8 });
  const eCopy = useSpringEntrance(8, { damping: 11, mass: 0.8 });
  const eItems = [
    useSpringEntrance(10, { damping: 13, mass: 0.9 }),
    useSpringEntrance(18, { damping: 13, mass: 0.9 }),
    useSpringEntrance(26, { damping: 13, mass: 0.9 }),
    useSpringEntrance(34, { damping: 13, mass: 0.9 }),
  ];

  const items = [
    { label: "Forecasts", desc: "Predictive spending projections" },
    { label: "Alerts", desc: "Anomaly detection & warnings" },
    { label: "Savings", desc: "Goal tracking & progress" },
    { label: "Debt", desc: "Avalanche & snowball plans" },
  ];

  return (
    <SplitSlide
      background={BC.dark}
      textWidth={430}
      media={
        <MediaStage>
          <PhoneFrame
            src={staticFile("savings-debt.png")}
            delay={18}
            anchor="middle"
            x={-12}
            rotate={-3}
            entranceFrom="down"
          />
        </MediaStage>
      }
    >
      <div>
        <div
          style={{
            ...entranceDir(eTitle, "up"),
            fontSize: 38,
            fontWeight: 800,
            color: c.card,
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          Everything
          <br />
          you need
        </div>
        <div
          style={{
            ...entranceDir(eCopy, "up"),
            fontSize: 18,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.62)",
            marginBottom: 22,
          }}
        >
          Forecasting, protection, and planning in one budgeting loop.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                ...entranceDir(eItems[i], "right"),
                padding: "14px 18px",
                borderRadius: 14,
                border: `1px solid rgba(216,229,220,0.12)`,
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: c.sage,
                  marginBottom: 2,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SplitSlide>
  );
};

const SlideFinal: React.FC = () => {
  const eLine1 = useSpringEntrance(0, { damping: 10, mass: 0.7 });
  const eLine2 = useSpringEntrance(16, { damping: 8, mass: 0.8 });
  const eSub = useSpringEntrance(30);
  const eDeco = useSpringEntrance(42);

  return (
    <AbsoluteFill
      style={{
        background: BC.dark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...entranceDir(eDeco, "scale"),
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(216,229,220,0.06) 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            ...entranceDir(eLine1, "up"),
            fontSize: 34,
            fontWeight: 600,
            color: c.sage,
            letterSpacing: "0.04em",
            marginBottom: 18,
          }}
        >
          Truly
        </div>
        <div
          style={{
            ...entranceDir(eLine2, "scale"),
            fontSize: 72,
            fontWeight: 800,
            color: c.card,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Filipino Budgets
        </div>
        <div
          style={{
            ...entranceDir(eSub, "up"),
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 440,
            lineHeight: 1.45,
            margin: "0 auto",
          }}
        >
          Variable income, family obligations, protected essentials, and
          forward-looking guidance.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SLIDES = [
  SlideLogo,
  SlideTagline,
  SlideProblem,
  SlideGap,
  SlideStats,
  SlideSolution,
  SlideHowItWorks,
  SlideFeature,
  SlideFinal,
];

export const Main: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Audio
        src={staticFile(
          "Fun & Upbeat Background Music For Advertising Videos [Royalty Free - Commercial Use] [KhZLU-Hge-c].mp3",
        )}
        volume={(f) =>
          interpolate(
            f,
            [durationInFrames - fps * 2, durationInFrames],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ) * 0.22
        }
      />
      {SLIDES.map((Slide, i) => (
        <Sequence key={i} from={STARTS[i]} durationInFrames={SLIDE_DURATION}>
          <SlideWrap>
            <Slide />
          </SlideWrap>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
