import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Divider,
  Skeleton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStore } from "../../store/store";
import {
  updateUserPhysicalData,
  saveUserPhysicalData,
  getUserPhysicalData,
} from "../../lib/firestore";
import { PhysicalData } from "../../types/physicalData";
import FormField from "../FormField";
import { useIntl } from "react-intl";

const schema = yup.object().shape({
  birthDate: yup.string().required("Fecha de nacimiento es obligatoria"),
  height: yup.string().required("Altura es obligatoria"),
  weight: yup.string().required("Peso es obligatorio"),
});

type PhysicalDataForm = {
  birthDate: string;
  height: string;
  weight: string;
};

const CardFisico: React.FC = () => {
  const { user, updatePhysicalData } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const intl = useIntl();

  const defaultValues = {
    birthDate: "",
    height: "",
    weight: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PhysicalDataForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const fetchPhysicalData = async () => {
      if (user?.physicalDataId) {
        const physicalData = await getUserPhysicalData(user.physicalDataId);
        if (physicalData) {
          reset(physicalData);
        }
      } else {
        reset(defaultValues);
      }
    };

    fetchPhysicalData();
  }, [user, reset]);

  const onSubmit = async (data: PhysicalDataForm) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const physicalData: PhysicalData = {
      physicalDataId: user.physicalDataId || "",
      userId: user.userId || "",
      ...data,
    };

    try {
      if (user.physicalDataId) {
        await updateUserPhysicalData(user.physicalDataId, physicalData);
      } else {
        const newPhysicalDataId = await saveUserPhysicalData(user.userId, physicalData);
        physicalData.physicalDataId = newPhysicalDataId;
        updatePhysicalData(physicalData);
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving physical data: ", error);
    }
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom>
            {intl.formatMessage({ id: "profile.physicalData" })}
          </Typography>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSubmit(onSubmit)}
            >
              {intl.formatMessage({ id: "profile.save" })}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              {intl.formatMessage({ id: "profile.edit" })}
            </Button>
          )}
        </Box>
        <Grid container spacing={2} alignItems="center" mt={2}>
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {intl.formatMessage({ id: "profile.physicalData" })}
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                <FormField
                  control={control}
                  name="birthDate"
                  label={intl.formatMessage({ id: "profile.birthDate" })}
                  errors={errors}
                  isEditing={isEditing}
                  handleBlur={() => {}}
                  disabled={!isEditing}
                  renderField={() => (
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={intl.formatMessage({ id: "profile.birthDate" })}
                          variant="outlined"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.birthDate}
                          helperText={errors.birthDate ? errors.birthDate.message : ""}
                        />
                      )}
                    />
                  )}
                />
                <FormField
                  control={control}
                  name="height"
                  label={intl.formatMessage({ id: "profile.height" })}
                  errors={errors}
                  isEditing={isEditing}
                  handleBlur={() => {}}
                  disabled={!isEditing}
                />
                <FormField
                  control={control}
                  name="weight"
                  label={intl.formatMessage({ id: "profile.weight" })}
                  errors={errors}
                  isEditing={isEditing}
                  handleBlur={() => {}}
                  disabled={!isEditing}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const CardFisicoSkeleton: React.FC = () => {
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Datos Físicos
        </Typography>
        <Grid container spacing={2} alignItems="center" mt={2}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={40} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={40} />
          </Grid>
        </Grid>
        <Skeleton variant="rectangular" height={36} />
      </CardContent>
    </Card>
  );
};

export default CardFisico;
