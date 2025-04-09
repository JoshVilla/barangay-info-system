import React from "react";

type Props = {
  title: string;
};

const TitlePage = ({ title }: Props) => {
  return <div className="text-xl font-bold">{title}</div>;
};

export default TitlePage;
