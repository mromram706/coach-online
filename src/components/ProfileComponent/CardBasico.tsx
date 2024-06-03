import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Badge,
  Paper,
  Skeleton,
  Box,
} from "@mui/material";
import { User } from "../../types/user";
import { updateUser, updateUserProfileImage } from "../../lib/firestore";
import { useStore } from "../../store/store";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditableTextField from "../EditableTextField";
import { useIntl } from "react-intl";

interface CardBasicoProps {
  user: User;
  initialLetter: string;
  colorLetter: string;
}

const CardBasico: React.FC<CardBasicoProps> = ({ user, initialLetter, colorLetter }) => {
  const { setUser } = useStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [photo, setPhoto] = useState(user.photoURL || "");
  const intl = useIntl();

  const handleSaveName = async (newName: string) => {
    if (user && newName) {
      await updateUser(user.userId, newName);
      setUser({ ...user, name: newName });
      setName(newName);
    }
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        const photoURL = await updateUserProfileImage(user.userId, file);
        setPhoto(photoURL);
        setUser({ ...user, photoURL });
      } catch (error) {
        console.error("Error uploading photo: ", error);
      }
    }
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "profile.basicData" })}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            type="file"
            onChange={handlePhotoChange}
          />
          <label htmlFor="avatar-upload">
            <IconButton component="span">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<PhotoCameraIcon />}
              >
                <Avatar
                  src={photo}
                  alt={user.name}
                  sx={{
                    bgcolor: user.photoURL ? "inherit" : colorLetter,
                    width: 120, // Aumentar tamaño del avatar en un 20%
                    height: 120, // Aumentar tamaño del avatar en un 20%
                  }}
                >
                  {user.photoURL ? null : initialLetter}
                </Avatar>
              </Badge>
            </IconButton>
          </label>
        </Box>
        <EditableTextField
          label={intl.formatMessage({ id: "profile.name" })}
          icon={<PersonIcon sx={{ mr: 1 }} />}
          value={name}
          onSave={handleSaveName}
          isEditing={isEditingName}
          setIsEditing={setIsEditingName}
        />
        <Paper variant="outlined" sx={{ mt: 2, p: 2, display: "flex", alignItems: "center" }}>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="body1">{user.email}</Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

export const CardBasicoSkeleton: React.FC = () => {
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Datos Básicos
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Skeleton variant="circular" width={120} height={120} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="80%" height={40} />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Skeleton variant="rectangular" width={120} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardBasico;
