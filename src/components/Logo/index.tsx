import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";

interface LogoProps {
  height: number;
  width: number;
}

const Logo: React.FC<LogoProps> = ({ height, width }) => {
  return (
    <Link href="/" passHref>
      <Box height="95%" display="flex" alignItems="center" maxHeight={height}>
        <Image
          src="/images/logo.png"
          alt="Mi Logotipo"
          layout="intrinsic"
          width={width}
          height={height}
          sizes="(max-width: 600px) 100vw, 600px"
          style={{ height: "95%", width: "auto", maxHeight: "90px" }}
        />
      </Box>
    </Link>
  );
};

export default Logo;
