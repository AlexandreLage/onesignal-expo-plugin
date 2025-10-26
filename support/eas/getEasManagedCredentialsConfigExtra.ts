import { ExpoConfig } from "@expo/config-types";
import { OneSignalPluginProps } from "../../types/types";
import { NSE_TARGET_NAME } from "../iosConstants";
import { computeNSEBundleIdentifier } from "../helpers";

export default function getEasManagedCredentialsConfigExtra(
  config: ExpoConfig,
  props?: OneSignalPluginProps
): { [k: string]: any } {
  const nseBundleIdentifier = computeNSEBundleIdentifier(
    config?.ios?.bundleIdentifier || "",
    props?.iosNSEBundleIdentifier
  );

  return {
    ...config.extra,
    eas: {
      ...config.extra?.eas,
      build: {
        ...config.extra?.eas?.build,
        experimental: {
          ...config.extra?.eas?.build?.experimental,
          ios: {
            ...config.extra?.eas?.build?.experimental?.ios,
            appExtensions: [
              ...(config.extra?.eas?.build?.experimental?.ios?.appExtensions ??
                []),
              {
                // keep in sync with native changes in NSE
                targetName: NSE_TARGET_NAME,
                bundleIdentifier: nseBundleIdentifier,
                entitlements: {
                  "com.apple.security.application-groups": [
                    props?.appGroupName ??
                      `group.${config?.ios?.bundleIdentifier}.onesignal`,
                  ],
                },
              },
            ],
          },
        },
      },
    },
  };
}
