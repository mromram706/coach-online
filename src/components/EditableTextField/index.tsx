import React, { useState } from "react";
import { TextField, Typography, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useIntl } from "react-intl";

type EditableTextFieldProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  onSave: (value: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  label,
  icon,
  value,
  onSave,
  isEditing,
  setIsEditing,
}) => {
  const [editValue, setEditValue] = useState(value);
  const intl = useIntl();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, display: "flex", alignItems: "center", mt: 2 }}>
      {icon}
      {isEditing ? (
        <TextField
          label={label}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          fullWidth
          sx={{ ml: 1 }}
        />
      ) : (
        <Typography variant="body1" sx={{ flexGrow: 1, ml: 1 }}>
          {value || intl.formatMessage({ id: "editableTextField.noSpecified" })}
        </Typography>
      )}
      <IconButton onClick={isEditing ? handleSave : handleEdit} color="primary">
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    </Paper>
  );
};

export default EditableTextField;
