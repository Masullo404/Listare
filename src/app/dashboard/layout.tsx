import FOOTER from "@/components/layout/footer";
import NAV from "@/components/layout/nav";

export default function DashBoardLayour({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>
        <NAV/>
         {children}
        <FOOTER/>
        </>
    );
  }