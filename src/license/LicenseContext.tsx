import React, { createContext, useContext, useMemo } from "react";

interface LicenseContextValue {
  /** Whether the current instance has an active Pro license */
  isPro: boolean;
  /** The license key provided (empty string for free tier) */
  licenseKey: string;
}

const LicenseContext = createContext<LicenseContextValue>({
  isPro: false,
  licenseKey: "",
});

/**
 * Validates a license key format.
 * Keys must follow the pattern: PC-PRO-XXXX-XXXX-XXXX (alphanumeric segments).
 */
function validateLicenseKey(key: string): boolean {
  if (!key) return false;
  const pattern = /^PC-PRO-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(key.toUpperCase());
}

interface LicenseProviderProps {
  /** License key for enabling Pro features */
  licenseKey?: string;
  children: React.ReactNode;
}

/**
 * Provider component that enables Pro features when a valid license key is supplied.
 *
 * @example
 * ```tsx
 * // Free tier (default)
 * <LicenseProvider>
 *   <ImageSlider ... />
 * </LicenseProvider>
 *
 * // Pro tier
 * <LicenseProvider licenseKey="PC-PRO-XXXX-XXXX-XXXX">
 *   <ImageSlider ... />
 * </LicenseProvider>
 * ```
 */
export const LicenseProvider: React.FC<LicenseProviderProps> = ({
  licenseKey = "",
  children,
}) => {
  const value = useMemo(
    () => ({
      isPro: validateLicenseKey(licenseKey),
      licenseKey,
    }),
    [licenseKey]
  );

  return (
    <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLicense = (): LicenseContextValue => {
  return useContext(LicenseContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProFeature = (): boolean => {
  const { isPro } = useLicense();
  return isPro;
};
