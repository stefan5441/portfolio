type Props = {
  children: React.ReactNode;
};

export const Header: React.FC<Props> = ({ children }) => {
  return <h1 className="text-2xl font-semibold">{children}</h1>;
};
