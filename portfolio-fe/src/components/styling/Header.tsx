type Props = {
  children: React.ReactNode;
};

export const Header: React.FC<Props> = ({ children }) => {
  return <h1 className="text-4xl font-bold">{children}</h1>;
};
