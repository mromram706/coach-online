import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import { useIntl } from "react-intl";
import { Plan } from "@/src/types/subscription";
import { useStore } from "../../store/store";
import { getUserAddress } from "../../lib/firestore";
import PayPalButton from "../PayPalButton"; // Importa tu componente de botón de PayPal
import CheckIcon from "@mui/icons-material/Check";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import { useRouter } from "next/router";

type PlanConfirmationDialogProps = {
  open: boolean;
  plan: Plan | null;
  onClose: () => void;
  onConfirm: () => void;
};

const PlanConfirmationDialog: React.FC<PlanConfirmationDialogProps> = ({
  open,
  plan,
  onClose,
  onConfirm,
}) => {
  const intl = useIntl();
  const { user } = useStore();
  const [billingAddress, setBillingAddress] = useState<string | null>(null);
  const [loadingAddress, setLoadingAddress] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const router = useRouter();

  useEffect(() => {
    const fetchAddress = async () => {
      if (user) {
        const addressData = await getUserAddress(user.userId);
        if (addressData) {
          const formattedAddress = `
            ${addressData.nombreVia} ${addressData.numero}
            ${addressData.bloque ? `Bloque: ${addressData.bloque}\n` : ""}
            ${addressData.portal ? `Portal: ${addressData.portal}\n` : ""}
            ${addressData.escalera ? `Escalera: ${addressData.escalera}\n` : ""}
            ${addressData.piso ? `Piso: ${addressData.piso}\n` : ""}
            ${addressData.puerta ? `Puerta: ${addressData.puerta}\n` : ""}
            ${addressData.codigoPostal} ${addressData.localidad}, ${addressData.municipio}, ${addressData.provincia}, ${addressData.pais.name}
          `;
          setBillingAddress(formattedAddress);
        }
      }
      setLoadingAddress(false);
    };

    fetchAddress();
  }, [user]);

  const handleProfileRedirect = () => {
    router.push("/profile");
  };

  if (!plan) return null;

  const basePrice = plan.price / 1.21;
  const iva = plan.price - basePrice;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{intl.formatMessage({ id: "planConfirmationDialog.title" })}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom textAlign="center">
                  {intl.formatMessage({ id: "planConfirmationDialog.selectedPlan" })}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "left" }}>
                      {intl.formatMessage({ id: plan.name })}
                    </Typography>
                    <Box mt={2} textAlign="center">
                      <Typography variant="body1">
                        {intl.formatMessage({ id: "planConfirmationDialog.price" })}:{" "}
                        {basePrice.toFixed(2)} €
                      </Typography>
                      <Typography variant="body1">IVA (21%): {iva.toFixed(2)} €</Typography>
                      <Typography variant="body1">Total: {plan.price.toFixed(2)} €</Typography>
                    </Box>
                  </Grid>
                  <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, mx: 2 }} />
                  <Grid item xs={12} md={5}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
                    >
                      {intl.formatMessage({ id: "planConfirmationDialog.features" })}
                    </Typography>
                    <List>
                      {plan.features?.map((feature, index) => (
                        <ListItem key={index} sx={{ justifyContent: "flex-start" }}>
                          <CheckIcon sx={{ color: "green", mr: 1 }} />
                          {intl.formatMessage({ id: feature.name })}
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {intl.formatMessage({ id: "planConfirmationDialog.billingAddress" })}
                </Typography>
                {loadingAddress ? (
                  <CircularProgress size={24} />
                ) : billingAddress ? (
                  <Box>
                    {billingAddress.split("\n").map((line, index) => (
                      <Typography key={index}>{line}</Typography>
                    ))}
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1">
                      {intl.formatMessage({ id: "planConfirmationDialog.noAddress" })}
                    </Typography>
                    <Button
                      onClick={handleProfileRedirect}
                      color="primary"
                      variant="contained"
                      sx={{ mt: 2 }}
                    >
                      {intl.formatMessage({ id: "planConfirmationDialog.updateAddress" })}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <CardContent>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel component="legend">
                    {intl.formatMessage({ id: "planConfirmationDialog.paymentMethod" })}
                  </FormLabel>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {intl.formatMessage({ id: "planConfirmationDialog.paymentExplanation" })}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    row
                    sx={{ justifyContent: "space-around" }}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={(
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Typography>
                            {intl.formatMessage({ id: "planConfirmationDialog.creditCard" })}
                          </Typography>
                          <Box mt={1}>
                            <CreditCardIcon sx={{ fontSize: 40 }} />
                          </Box>
                        </Box>
                      )}
                    />
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label={(
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Typography> {intl.formatMessage({ id: "planConfirmationDialog.paypal" })}</Typography>
                          <Box mt={1}>
                            <PayPalButton />
                          </Box>
                        </Box>
                      )}
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              {intl.formatMessage({ id: "planConfirmationDialog.continueConfirmation" })}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {intl.formatMessage({ id: "planConfirmationDialog.cancel" })}
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {intl.formatMessage({ id: "planConfirmationDialog.confirm" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanConfirmationDialog;
