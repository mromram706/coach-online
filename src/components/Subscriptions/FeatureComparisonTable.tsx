import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useIntl } from "react-intl";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type FeatureComparisonTableProps = {
  features: { name: string; availableIn: boolean[] }[];
};

const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({ features }) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      {isSmallScreen ? (
        features.map((feature, index) => (
          <Box
            key={index}
            sx={{ borderBottom: "1px solid", borderColor: theme.palette.divider, mb: 2 }}
          >
            <Box sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
              <strong>{intl.formatMessage({ id: feature.name })}</strong>
            </Box>
            {feature.availableIn.map((available, i) => (
              <Box key={i} sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {intl.formatMessage({
                    id: `plan.name.${["initial", "basic", "pro", "premium"][i]}`,
                  })}
                </Box>
                <Box>
                  {available ? (
                    <CheckIcon style={{ color: theme.palette.success.main }} />
                  ) : (
                    <CloseIcon style={{ color: theme.palette.error.main }} />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        ))
      ) : (
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.background.paper }}>
            <TableRow>
              <TableCell>
                {intl.formatMessage({ id: "featureComparisonTable.featureComparison" })}
              </TableCell>
              <TableCell>{intl.formatMessage({ id: "plan.name.initial" })}</TableCell>
              <TableCell>{intl.formatMessage({ id: "plan.name.basic" })}</TableCell>
              <TableCell>{intl.formatMessage({ id: "plan.name.pro" })}</TableCell>
              <TableCell>{intl.formatMessage({ id: "plan.name.premium" })}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell>{intl.formatMessage({ id: feature.name })}</TableCell>
                {feature.availableIn.map((available, i) => (
                  <TableCell key={i} align="center">
                    {available ? (
                      <CheckIcon style={{ color: theme.palette.success.main }} />
                    ) : (
                      <CloseIcon style={{ color: theme.palette.error.main }} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default FeatureComparisonTable;
