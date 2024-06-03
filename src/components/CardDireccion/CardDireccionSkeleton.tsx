import { Card, CardContent, Typography, Grid, Skeleton, Box } from "@mui/material";

export const CardDireccionSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Dirección
        </Typography>
        <Grid container spacing={2}>
          {/* Datos Obligatorios */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Datos Obligatorios
                </Typography>
                <Grid container spacing={2}>
                  {[...Array(9)].map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <Skeleton variant="text" width="100%" height={56} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Datos Opcionales */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Datos Opcionales
                </Typography>
                <Grid container spacing={2}>
                  {[...Array(5)].map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <Skeleton variant="text" width="100%" height={56} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Botón de Enviar */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mt={3}>
              <Skeleton variant="rectangular" width={120} height={36} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
