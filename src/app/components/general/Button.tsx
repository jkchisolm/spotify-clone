"use client";

type Props = {
  color: string;
  hoverColor: string;
  textColor: string;
  children: React.ReactNode;
  style: "normal" | "pill";
};

export default function Button(props: Props) {
  const color = props.color;
  console.log(color);

  return (
    <button
      className={`${color} hover:${props.hoverColor} ${props.textColor} font-bold py-2 px-4 ${
        props.style == "pill" ? "rounded-full" : "rounded"
      }`}
    >
      {props.children}
    </button>
  );
}
