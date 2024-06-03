import React, { useRef } from "react";
import { TextField, List, ListItem, ListItemText } from "@mui/material";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useStore } from "@/src/store/store";

interface AddressAutocompleteProps {
  label: string;
  onSelectAddress: (addressDetails: {
    country: string;
    countryCode: string;
    addressComponents: google.maps.GeocoderAddressComponent[];
  }) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ label, onSelectAddress }) => {
  const { googleMapsLoaded } = useStore();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });

  const ref = useRef<HTMLDivElement | null>(null);
  useOnclickOutside(
    () => {
      clearSuggestions();
    },
    { refs: [ref] },
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const addressComponents = results[0].address_components;

      let country = "";
      let countryCode = "";

      addressComponents.forEach((component) => {
        if (component.types.includes("country")) {
          country = component.long_name;
          countryCode = component.short_name;
        }
      });

      if (country && countryCode) {
        onSelectAddress({ country, countryCode, addressComponents });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <ListItem button key={place_id} onClick={() => handleSelect(suggestion.description)}>
          <ListItemText primary={main_text} secondary={secondary_text} />
        </ListItem>
      );
    });

  if (!googleMapsLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={ref}>
      <TextField
        label={label}
        value={value || ""}
        onChange={handleInput}
        disabled={!ready}
        fullWidth
        inputProps={{ style: { textTransform: "capitalize" } }}
      />
      {status === "OK" && <List>{renderSuggestions()}</List>}
    </div>
  );
};

export default AddressAutocomplete;
