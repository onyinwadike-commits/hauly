# Expo EAS Build & Submit Guide

## Prerequisites

1. Expo account at [expo.dev](https://expo.dev)
2. Apple Developer account ($99/year) for iOS
3. Google Play Developer account ($25 one-time) for Android
4. EAS CLI installed:
   ```bash
   npm install -g eas-cli
   ```

## Initial Setup

### 1. Login to EAS

```bash
eas login
```

### 2. Link Project

```bash
cd apps/mobile
eas init
```

This creates an EAS project and adds the `projectId` to `app.json`.

### 3. Configure Secrets

Store sensitive values in EAS Secrets (never commit these):

```bash
# Supabase
eas secret:create --name supabase_url --value "https://your-project.supabase.co" --scope project
eas secret:create --name supabase_anon_key --value "eyJ..." --scope project

# Stripe
eas secret:create --name stripe_publishable_key --value "pk_live_..." --scope project

# Google Maps
eas secret:create --name google_maps_key --value "AIza..." --scope project

# OneSignal
eas secret:create --name onesignal_app_id --value "..." --scope project
```

View secrets:
```bash
eas secret:list
```

## Build Profiles

### Development Build
For local testing with Expo Dev Client:
```bash
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Preview Build
For internal testing (TestFlight/Internal Testing):
```bash
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

### Production Build
For App Store/Google Play release:
```bash
eas build --profile production --platform all
# Or individually
eas build --profile production --platform ios
eas build --profile production --platform android
```

## iOS Configuration

### 1. Apple Developer Setup

1. Create App ID at [developer.apple.com](https://developer.apple.com)
   - Bundle ID: `com.hauly.app`
   - Capabilities: Push Notifications, Background Modes

2. Create Push Notification Key (for OneSignal)
   - Download `.p8` file
   - Note Key ID and Team ID

3. Update `eas.json` submit config:
   ```json
   "ios": {
     "appleId": "your-apple-id@email.com",
     "ascAppId": "1234567890",
     "appleTeamId": "ABCD1234"
   }
   ```

### 2. App Store Connect Setup

1. Create app at [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Note the Apple ID (numeric, not email)
3. Configure app details:
   - Name: Hauly
   - Primary Language: English (U.S.)
   - Bundle ID: com.hauly.app
   - SKU: hauly-ios

### 3. iOS Build

```bash
eas build --profile production --platform ios
```

EAS will:
- Auto-generate provisioning profiles
- Handle code signing
- Build the IPA

## Android Configuration

### 1. Google Play Console Setup

1. Create app at [play.google.com/console](https://play.google.com/console)
2. App details:
   - Name: Hauly
   - Package: com.hauly.app

3. Create service account for automated uploads:
   - Go to Setup > API access
   - Create new service account
   - Grant "Release Manager" permission
   - Download JSON key file

### 2. Configure Service Account

Save the JSON key (do NOT commit):
```bash
# Add to .gitignore if not already
echo "google-service-account.json" >> apps/mobile/.gitignore
```

Place the file at `apps/mobile/google-service-account.json`

### 3. Android Build

```bash
eas build --profile production --platform android
```

EAS will:
- Generate keystore (saved securely in EAS)
- Build AAB (Android App Bundle)

## Submit to Stores

### Submit to App Store

```bash
eas submit --platform ios --profile production
```

Options:
- `--latest` - Submit the latest build
- `--id BUILD_ID` - Submit a specific build

### Submit to Google Play

```bash
eas submit --platform android --profile production
```

Options:
- `--track internal` - Internal testing
- `--track alpha` - Closed testing
- `--track beta` - Open testing
- `--track production` - Production release

## Over-The-Air Updates

For non-native changes (JS/assets), use EAS Update:

### Setup Updates

```bash
# Configure updates
eas update:configure
```

### Publish Update

```bash
# To production channel
eas update --branch production --message "Bug fixes"

# To preview channel
eas update --branch preview --message "New feature"
```

### Update app.json Runtime Version

When native code changes, bump version:
```json
{
  "version": "1.0.1",
  "ios": { "buildNumber": "2" },
  "android": { "versionCode": 2 }
}
```

## Build Monitoring

### View Builds

```bash
eas build:list
```

Or visit: https://expo.dev/accounts/hauly/projects/hauly/builds

### View Logs

```bash
eas build:view BUILD_ID
```

## Environment Variables by Profile

| Profile | SUPABASE_URL | Stripe Key | Description |
|---------|--------------|------------|-------------|
| development | dev project | pk_test_... | Local testing |
| preview | staging project | pk_test_... | Internal testing |
| production | prod project | pk_live_... | App Store release |

## Troubleshooting

### Build Fails

1. Check logs: `eas build:view BUILD_ID`
2. Common issues:
   - Missing native dependencies
   - Invalid provisioning profile
   - CocoaPods issues (iOS)

### iOS Signing Issues

```bash
# Clear credentials and regenerate
eas credentials --platform ios
```

### Android Keystore Issues

```bash
# View keystore info
eas credentials --platform android
```

### OneSignal Not Working

1. Verify push notification key in OneSignal dashboard
2. Check `onesignal-expo-plugin` is in plugins array
3. Ensure `UIBackgroundModes` includes `remote-notification`

### Google Maps Not Showing

1. Verify API key is enabled for both iOS and Android
2. Check Maps SDK is enabled in Google Cloud Console
3. API key restrictions match bundle ID / package name

## Version Management

### Semantic Versioning

- `version`: User-facing version (1.0.0)
- `ios.buildNumber`: Increment for each iOS build
- `android.versionCode`: Increment for each Android build

### Example Release Workflow

```bash
# 1. Update versions in app.json
# version: "1.1.0"
# ios.buildNumber: "5"
# android.versionCode: 5

# 2. Build
eas build --profile production --platform all

# 3. Submit
eas submit --platform ios
eas submit --platform android
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: EAS Build
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: cd apps/mobile && eas build --platform all --non-interactive
```

## Useful Commands

```bash
# List all builds
eas build:list

# Cancel a build
eas build:cancel BUILD_ID

# View credentials
eas credentials

# Check project configuration
eas diagnostics

# Update project config
eas update:configure
```
