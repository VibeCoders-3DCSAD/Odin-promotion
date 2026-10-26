import { fontFamily, loadFont } from "@remotion/google-fonts/Manrope";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { c, themeStyles, type Theme } from "./theme";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["300", "400", "500", "600", "700", "800"],
});

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const SLIDE_DURATION = 180;
const OVERLAP = 20;
const STARTS = Array.from(
  { length: 9 },
  (_, i) => i * (SLIDE_DURATION - OVERLAP),
);
export const TOTAL_DURATION = STARTS[STARTS.length - 1] + SLIDE_DURATION;

const scenes = [
  {
    theme: "dark" as Theme,
    eyebrow: "Personal finance management system",
    title: "A serious budget system for real Filipino life.",
    copy: "Budgie turns daily money choices into forecasting, alerts, and calm guidance.",
    image: "budgie-home.png",
    phone: "hero" as const,
    layout: "center" as const,
    icons: ["Forecast", "Detect", "Plan"],
  },
  {
    theme: "pearl" as Theme,
    eyebrow: "",
    title: "Budget apps exist. Local guidance still does not fit.",
    copy: "The issue is not only expense logging. It is advice that understands income timing, family duties, and shared obligations.",
    image: "budgie-new-transaction.png",
    phone: "right" as const,
    layout: "split" as const,
    icons: ["No context", "Generic rules", "Weak fit"],
  },
  {
    theme: "light" as Theme,
    eyebrow: "",
    title: "Needs, obligations, and goals rarely arrive in neat columns.",
    copy: "Budgie treats family support, bills, savings, debt, insurance, and community spending as part of the same financial picture.",
    image: "budgie-activity.png",
    phone: "large" as const,
    layout: "portrait" as const,
    icons: ["Variable pay", "Family support", "Community spend"],
  },
  {
    theme: "pearl" as Theme,
    eyebrow: "The evidence",
    title: "People are not failing budgeting tools.",
    copy: "Notebooks, spreadsheets, and no dedicated app are signals that current products are not becoming habits.",
    image: "budgie-budget-suggestion.png",
    phone: "none" as const,
    layout: "stats" as const,
    icons: ["22.2% manual", "57.8% no app"],
  },
  {
    theme: "light" as Theme,
    eyebrow: "",
    title: "The model is shaped around local financial behavior.",
    copy: "Filipino-grounded categories make the system more useful than a generic expense tracker with renamed labels.",
    image: "budgie-scheduled.png",
    phone: "left" as const,
    layout: "column" as const,
    icons: ["Government", "Household", "Community"],
  },
  {
    theme: "dark" as Theme,
    eyebrow: "",
    title: "Budgie meets Filipinos where they are.",
    copy: "A calm financial control room for every income level, obligation, and goal.",
    image: "budgie-budget-suggestion.png",
    phone: "small" as const,
    layout: "statement" as const,
    icons: ["Explain", "Adjust", "Protect"],
  },
  {
    theme: "pearl" as Theme,
    eyebrow: "The product loop",
    title: "Input becomes pattern. Pattern becomes guidance.",
    copy: "Logging is only the start. Repeated entries teach Budgie how to forecast, detect anomalies, and suggest practical next moves.",
    image: "budgie-forecast.png",
    phone: "none" as const,
    layout: "flow" as const,
    icons: ["Capture", "Learn", "Guide"],
  },
  {
    theme: "light" as Theme,
    eyebrow: "",
    title: "Visibility, prediction, protection, and planning in one loop.",
    copy: "Dashboard, budget suggestions, spending forecasts, alerts, savings, debt, insurance, and behavioral profiling work together.",
    image: "budgie-home-summaries.png",
    phone: "small" as const,
    layout: "grid" as const,
    icons: [
      "Dashboard",
      "Forecast",
      "Alerts",
      "Savings",
      "Debt",
      "Insurance",
      "Profile",
      "Suggest",
    ],
  },
  {
    theme: "dark" as Theme,
    eyebrow: "",
    title: "Budgie makes truly Filipino budgets.",
    copy: "Built for variable income, family obligations, protected essentials, and forward-looking guidance.",
    image: "budgie-logo.png",
    phone: "none" as const,
    layout: "final" as const,
    icons: ["Truly Filipino", "Practical intelligence"],
  },
];

const useSlideFade = () => {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [0, OVERLAP, SLIDE_DURATION - OVERLAP, SLIDE_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease },
  );
};

const useSlideDrift = (amount = 24) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, SLIDE_DURATION], [amount, -amount], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const useSpringReveal = (delay = 0) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const p = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 14, mass: 0.8 },
  });
  return { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [32, 0])}px)` };
};

const SceneWrap: React.FC<{
  children: React.ReactNode;
  theme: Theme;
}> = ({ children, theme }) => {
  const opacity = useSlideFade();
  const drift = useSlideDrift(16);
  const t = themeStyles[theme];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: t.bg,
        color: t.fg,
        opacity,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(0,77,27,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,77,27,0.05) 0%, transparent 70%)",
          right: -200 + drift * 2,
          top: 80,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(65,237,164,0.06) 0%, transparent 70%)"
              : theme === "pearl"
                ? "radial-gradient(circle, rgba(0,77,27,0.04) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(0,77,27,0.04) 0%, transparent 70%)",
          left: -160 - drift,
          bottom: 100 - drift,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            theme === "dark"
              ? `linear-gradient(90deg, transparent, ${c.tealLight}, transparent)`
              : `linear-gradient(90deg, transparent, ${c.gold}, transparent)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const PhoneFrame: React.FC<{
  image: string;
  variant:
    | "hero"
    | "left"
    | "right"
    | "large"
    | "small"
    | "statement"
    | "flow"
    | "grid"
    | "none";
  delay?: number;
}> = ({ image, variant, delay = 8 }) => {
  const reveal = useSpringReveal(delay);
  if (variant === "none") return null;

  const widths: Record<string, number> = {
    hero: 500,
    large: 540,
    left: 440,
    right: 440,
    small: 380,
    statement: 520,
    flow: 520,
    grid: 420,
  };
  const w = widths[variant];
  const h = w * 1.95;
  const rotate = variant === "left" ? -3 : variant === "right" ? 3 : 0;

  const positions: Record<string, { left: number; top: number }> = {
    hero: { left: 290, top: 630 },
    large: { left: 270, top: 680 },
    left: { left: 60, top: 720 },
    right: { left: 580, top: 720 },
    small: { left: 350, top: 680 },
    statement: { left: 280, top: 540 },
    flow: { left: 280, top: 780 },
    grid: { left: 330, top: 430 },
  };
  const pos = positions[variant];

  return (
    <div
      style={{
        ...reveal,
        position: "absolute",
        left: pos.left,
        top: pos.top,
        width: w,
        height: h,
        transform: `${reveal.transform} rotate(${rotate}deg)`,
        zIndex: 3,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 64,
          padding: 10,
          background: `linear-gradient(145deg, ${c.ink}, #1b1c1a)`,
          boxShadow:
            variant === "left" || variant === "right"
              ? `0 30px 60px rgba(11,25,20,0.25)`
              : `0 40px 80px rgba(11,25,20,0.3)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            marginLeft: -50,
            width: 100,
            height: 6,
            borderRadius: 3,
            background: "#1b1c1a",
            zIndex: 5,
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 54,
            overflow: "hidden",
            backgroundColor: c.white,
          }}
        >
          <Img
            src={staticFile(image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: image === "budgie-logo.png" ? "contain" : "cover",
              padding: image === "budgie-logo.png" ? 80 : 0,
              backgroundColor: image === "budgie-logo.png" ? c.white : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Eyebrow: React.FC<{
  text: string;
  theme: Theme;
  delay?: number;
}> = ({ text, theme, delay = 0 }) => {
  const reveal = useSpringReveal(delay);
  return (
    <div
      style={{
        ...reveal,
        color: theme === "dark" ? c.tealLight : c.gold,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        marginBottom: 22,
      }}
    >
      {text}
    </div>
  );
};

const SlideTitle: React.FC<{
  text: string;
  theme: Theme;
  size?: "xl" | "lg" | "md";
  delay?: number;
  align?: "left" | "center";
}> = ({ text, theme, size = "xl", delay = 6, align = "left" }) => {
  const reveal = useSpringReveal(delay);
  const t = themeStyles[theme];
  const sizes: Record<string, { fontSize: number; lineHeight: number; maxWidth: number }> =
    {
      xl: { fontSize: 74, lineHeight: 0.94, maxWidth: 880 },
      lg: { fontSize: 64, lineHeight: 0.96, maxWidth: 820 },
      md: { fontSize: 52, lineHeight: 1, maxWidth: 760 },
    };
  const s = sizes[size];
  return (
    <div
      style={{
        ...reveal,
        color: t.fg,
        fontSize: s.fontSize,
        fontWeight: 800,
        letterSpacing: "-0.05em",
        lineHeight: s.lineHeight,
        maxWidth: s.maxWidth,
        textAlign: align,
      }}
    >
      {text}
    </div>
  );
};

const SlideCopy: React.FC<{
  text: string;
  theme: Theme;
  delay?: number;
  maxWidth?: number;
}> = ({ text, theme, delay = 14, maxWidth = 740 }) => {
  const reveal = useSpringReveal(delay);
  const t = themeStyles[theme];
  return (
    <div
      style={{
        ...reveal,
        color: t.muted,
        fontSize: 30,
        fontWeight: 400,
        lineHeight: 1.42,
        maxWidth,
        marginTop: 26,
      }}
    >
      {text}
    </div>
  );
};

const HeaderBlock: React.FC<{
  eyebrow?: string;
  title: string;
  copy?: string;
  theme: Theme;
  titleSize?: "xl" | "lg" | "md";
  align?: "left" | "center";
  left?: number;
  top?: number;
  right?: number;
}> = ({
  eyebrow,
  title,
  copy,
  theme,
  titleSize = "xl",
  align = "left",
  left = 76,
  top = 90,
  right = 76,
}) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      right,
      zIndex: 4,
      textAlign: align,
    }}
  >
    {eyebrow ? <Eyebrow text={eyebrow} theme={theme} delay={0} /> : null}
    <SlideTitle text={title} theme={theme} size={titleSize} delay={4} align={align} />
    {copy ? <SlideCopy text={copy} theme={theme} delay={12} /> : null}
  </div>
);

const IconBadge: React.FC<{
  label: string;
  variant?: "default" | "outline" | "gold";
  dark?: boolean;
  delay?: number;
}> = ({ label, variant = "default", dark = false, delay = 0 }) => {
  const reveal = useSpringReveal(delay);
  const isGold = variant === "gold";
  const fg = dark ? c.white : c.ink;
  const rule = isGold ? c.gold : dark ? "rgba(255,255,255,0.32)" : c.teal;

  return (
    <div
      style={{
        ...reveal,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 0 12px",
        backgroundColor: "transparent",
        color: fg,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,77,27,0.18)"}`,
        boxShadow: "none",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          width: 54,
          height: 3,
          borderRadius: 999,
          backgroundColor: rule,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontSize: 25,
          fontWeight: isGold ? 800 : 650,
          letterSpacing: "-0.025em",
          color: isGold ? (dark ? c.goldLight : c.ink) : fg,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const LayoutCenter: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => {
  return (
    <SceneWrap theme={scene.theme}>
      <HeaderBlock
        eyebrow={scene.eyebrow}
        title={scene.title}
        copy={scene.copy}
        theme={scene.theme}
        left={76}
        top={100}
      />
      <PhoneFrame image={scene.image} variant="hero" delay={16} />
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          bottom: 80,
          zIndex: 5,
          display: "flex",
          gap: 16,
          justifyContent: "center",
        }}
      >
        {scene.icons.map((item, i) => (
          <IconBadge
            key={item}
            label={item}
            variant={i === 1 ? "gold" : "default"}
            dark
            delay={28 + i * 6}
          />
        ))}
      </div>
    </SceneWrap>
  );
};

const LayoutSplit: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => (
  <SceneWrap theme={scene.theme}>
    <div
      style={{
        position: "absolute",
        left: 76,
        top: 130,
        width: 440,
        zIndex: 4,
      }}
    >
      <SlideTitle text={scene.title} theme={scene.theme} size="lg" delay={4} />
      <SlideCopy text={scene.copy} theme={scene.theme} delay={10} maxWidth={420} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 48,
        }}
      >
        {scene.icons.map((item, i) => (
          <IconBadge
            key={item}
            label={item}
            variant={i === 2 ? "gold" : "outline"}
            delay={20 + i * 6}
          />
        ))}
      </div>
    </div>
    <PhoneFrame image={scene.image} variant="right" delay={14} />
  </SceneWrap>
);

const LayoutPortrait: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => (
  <SceneWrap theme={scene.theme}>
    <HeaderBlock
      title={scene.title}
      copy={scene.copy}
      theme={scene.theme}
      titleSize="md"
      left={76}
      top={88}
      right={76}
    />
    <PhoneFrame image={scene.image} variant="hero" delay={18} />
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        bottom: 82,
        zIndex: 5,
        display: "flex",
        gap: 14,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {scene.icons.map((item, i) => (
        <IconBadge
          key={item}
          label={item}
          variant={i === 2 ? "gold" : "outline"}
          delay={26 + i * 5}
        />
      ))}
    </div>
  </SceneWrap>
);

const StatCard: React.FC<{
  stat: string;
  label: string;
  delay?: number;
  accent?: boolean;
}> = ({ stat, label, delay = 0, accent = false }) => {
  const reveal = useSpringReveal(delay);
  return (
    <div
      style={{
        ...reveal,
        display: "flex",
        alignItems: "flex-end",
        gap: 28,
        padding: "24px 0 30px",
        borderBottom: `1px solid rgba(0,77,27,0.18)`,
      }}
    >
      <div
        style={{
          fontSize: 148,
          fontWeight: 800,
          letterSpacing: "-0.06em",
          color: accent ? c.gold : c.teal,
          lineHeight: 0.78,
          minWidth: 420,
        }}
      >
        {stat}
      </div>
      <div
        style={{
          fontSize: 31,
          lineHeight: 1.12,
          color: c.ink,
          fontWeight: 700,
          maxWidth: 360,
          paddingBottom: 10,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const LayoutStats: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => {
  const [stat1, stat2] = scene.icons;
  return (
    <SceneWrap theme={scene.theme}>
      <HeaderBlock
        eyebrow={scene.eyebrow}
        title={scene.title}
        copy={scene.copy}
        theme={scene.theme}
        titleSize="lg"
        left={76}
        top={100}
      />
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 520,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 5,
        }}
      >
        <StatCard
          stat={stat1 ?? ""}
          label="still use notebooks or spreadsheets"
          delay={16}
        />
        <StatCard
          stat={stat2 ?? ""}
          label="use no dedicated budgeting app"
          delay={24}
          accent
        />
      </div>
    </SceneWrap>
  );
};

const LayoutColumn: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => (
  <SceneWrap theme={scene.theme}>
    <PhoneFrame image={scene.image} variant="left" delay={8} />
    <div
      style={{
        position: "absolute",
        left: 560,
        top: 130,
        right: 76,
        zIndex: 4,
      }}
    >
      <SlideTitle text={scene.title} theme={scene.theme} size="md" delay={6} />
      <SlideCopy text={scene.copy} theme={scene.theme} delay={12} maxWidth={440} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginTop: 40,
        }}
      >
        {scene.icons.map((item, i) => (
          <IconBadge
            key={item}
            label={item}
            variant={i === 2 ? "gold" : "outline"}
            delay={18 + i * 6}
          />
        ))}
      </div>
    </div>
  </SceneWrap>
);

const LayoutStatement: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => (
  <SceneWrap theme={scene.theme}>
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        top: 110,
        zIndex: 4,
      }}
    >
      <SlideTitle
        text={scene.title}
        theme={scene.theme}
        size="xl"
        delay={4}
      />
      <SlideCopy
        text={scene.copy}
        theme={scene.theme}
        delay={12}
        maxWidth={760}
      />
    </div>
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        bottom: 80,
        zIndex: 5,
        display: "flex",
        gap: 16,
      }}
    >
      {scene.icons.map((item, i) => (
        <IconBadge
          key={item}
          label={item}
          variant={i === 1 ? "gold" : "default"}
          dark
          delay={20 + i * 6}
        />
      ))}
    </div>
    <PhoneFrame image={scene.image} variant="statement" delay={16} />
  </SceneWrap>
);

const FlowCard: React.FC<{
  label: string;
  index: number;
  dark?: boolean;
}> = ({ label, index, dark = false }) => {
  const reveal = useSpringReveal(18 + index * 8);
  return (
    <div
      style={{
        ...reveal,
        flex: 1,
        borderRadius: 44,
        backgroundColor: index === 1 ? c.teal : c.white,
        color: index === 1 ? c.white : c.ink,
        padding: "32px 28px",
        boxShadow:
          index === 1
            ? `0 16px 40px rgba(0,77,27,0.25)`
            : `0 16px 36px rgba(11,25,20,0.06)`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor:
            index === 1
              ? "rgba(255,255,255,0.2)"
              : index === 2
                ? c.gold
                : c.teal,
          color: c.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 20,
        }}
      >
        {label.slice(0, 1)}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800 }}>{label}</div>
      {index < 2 ? (
        <div
          style={{
            position: "absolute",
            right: -22,
            top: "50%",
            marginTop: -8,
            fontSize: 28,
            color: c.sageDeep,
            opacity: 0.5,
          }}
        >
          →
        </div>
      ) : null}
    </div>
  );
};

const LayoutFlow: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => (
  <SceneWrap theme={scene.theme}>
    <HeaderBlock
      eyebrow={scene.eyebrow}
      title={scene.title}
      copy={scene.copy}
      theme={scene.theme}
      titleSize="lg"
      left={76}
      top={90}
    />
    <div
      style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 520,
          display: "flex",
        gap: 18,
        zIndex: 5,
      }}
    >
      {scene.icons.map((item, i) => (
        <FlowCard key={item} label={item} index={i} />
      ))}
    </div>
    <PhoneFrame image={scene.image} variant="flow" delay={30} />
  </SceneWrap>
);

const FeatureCard: React.FC<{
  label: string;
  delay?: number;
}> = ({ label, delay = 0 }) => {
  const reveal = useSpringReveal(delay);
  return (
    <div
      style={{
        ...reveal,
        borderRadius: 30,
        backgroundColor: c.white,
        padding: "22px 20px",
        boxShadow: `0 16px 36px rgba(11,25,20,0.06)`,
        border: `1px solid ${c.sage}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: c.teal,
          color: c.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {label.slice(0, 1)}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{label}</div>
    </div>
  );
};

const LayoutGrid: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => (
  <SceneWrap theme={scene.theme}>
    <HeaderBlock
      eyebrow=""
      title={scene.title}
      copy={scene.copy}
      theme={scene.theme}
      titleSize="md"
      left={76}
      top={90}
    />
    <PhoneFrame image={scene.image} variant="grid" delay={8} />
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        top: 1300,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
        zIndex: 5,
      }}
    >
      {scene.icons.slice(0, 8).map((item, i) => (
        <FeatureCard key={item} label={item} delay={16 + i * 4} />
      ))}
    </div>
  </SceneWrap>
);

const LayoutFinal: React.FC<{
  scene: (typeof scenes)[number];
}> = ({ scene }) => {
  const logo = useSpringReveal(0);
  const title = useSpringReveal(10);
  const copy = useSpringReveal(20);
  const icons = useSpringReveal(30);
  return (
    <SceneWrap theme={scene.theme}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 76,
          textAlign: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            ...logo,
            width: 160,
            height: 160,
            borderRadius: 48,
            backgroundColor: c.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginBottom: 40,
            boxShadow: `0 20px 50px rgba(11,25,20,0.15)`,
          }}
        >
          <Img
            src={staticFile("budgie-logo.png")}
            style={{ width: 160, height: 160, objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            ...title,
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: "-0.055em",
            lineHeight: 0.92,
            color: c.white,
            maxWidth: 820,
          }}
        >
          Budgie makes truly Filipino budgets.
        </div>
        <div
          style={{
            ...copy,
            fontSize: 30,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 680,
            marginTop: 32,
          }}
        >
          Cultural fit, practical intelligence, and calm financial control.
        </div>
        <div
          style={{
            ...icons,
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {scene.icons.map((item, i) => (
            <IconBadge
              key={item}
              label={item}
              variant={i === 1 ? "gold" : "default"}
              dark
              delay={0}
            />
          ))}
        </div>
      </AbsoluteFill>
    </SceneWrap>
  );
};

const layoutMap: Record<
  string,
  React.FC<{ scene: (typeof scenes)[number] }>
> = {
  center: LayoutCenter,
  split: LayoutSplit,
  portrait: LayoutPortrait,
  stats: LayoutStats,
  column: LayoutColumn,
  statement: LayoutStatement,
  flow: LayoutFlow,
  grid: LayoutGrid,
  final: LayoutFinal,
};

const Scene: React.FC<{ scene: (typeof scenes)[number] }> = ({ scene }) => {
  const Layout = layoutMap[scene.layout];
  return <Layout scene={scene} />;
};

export const Main: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: c.pearl }}>
      <Audio
        src={staticFile(
          "Fun & Upbeat Background Music For Advertising Videos [Royalty Free - Commercial Use] [KhZLU-Hge-c].mp3",
        )}
        volume={(f) =>
          interpolate(
            f,
            [durationInFrames - fps * 2, durationInFrames],
            [0.22, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
      {scenes.map((scene, i) => (
        <Sequence
          key={scene.title}
          from={STARTS[i]}
          durationInFrames={SLIDE_DURATION}
        >
          <Scene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
