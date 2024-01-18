import { createContext, useContext, ReactNode, useState } from "react";

interface GeolocationContextProps {
  children: ReactNode;
}

interface GeolocationData {
  lat?: number;
  lon?: number;
}

interface GeolocationContextType extends GeolocationData {
  updateGeolocationData: (lat: number, lon: number) => void;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(
  undefined
);

export const GeolocationProvider: React.FC<GeolocationContextProps> = ({
  children,
}) => {
  const [geolocationData, setGeolocationData] = useState<GeolocationData>({});

  const updateGeolocationData = (lat: number, lon: number) => {
    setGeolocationData({ lat, lon });
  };

  return (
    <GeolocationContext.Provider
      value={{ ...geolocationData, updateGeolocationData }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error("useGeolocation must be used within a GeolocationProvider");
  }
  return context;
};
