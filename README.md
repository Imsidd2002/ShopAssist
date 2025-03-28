
![Alt text](https://github.com/Imsidd2002/ShopAssist/blob/main/logo.PNG?raw=true)

# ShopAssist 📱🛒

**ShopAssist** is a React Native application designed to assist visually impaired individuals in shopping. It uses **OCR (Optical Character Recognition)** to recognize products in an aisle and provides **text-to-speech (TTS)** functionality to read out product details.

---

## ✨ Features
- **OCR Scanning**: Uses the device camera to scan product labels and extract text.
- **Text-to-Speech (TTS)**: Reads product names aloud for accessibility.
- **Barcode Scanning**: Identifies products using barcodes and fetches details.
- **Minimal UI**: Simple and intuitive interface for easy navigation.

---

## 📦 Packages Used
- [`react-native-vision-camera`](https://github.com/mrousavy/react-native-vision-camera) - Camera access.
- [`react-native-mlkit-ocr`](https://github.com/agoldis/react-native-mlkit-ocr) - OCR functionality.
- [`react-native-tts`](https://github.com/ak1394/react-native-tts) - Text-to-speech conversion.


---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have the following installed:
- Node.js & npm/yarn
- React Native CLI
- Android Studio (for emulator) / Xcode (for iOS development)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/Imsidd2002/ShopAssist.git
   cd shopassist
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Link Native Dependencies**
   ```sh
   npx pod-install  # For iOS only
   ```

4. **Run on Android**
   ```sh
   npx react-native run-android
   ```

5. **Run on iOS** (Mac only)
   ```sh
   npx react-native run-ios
   ```

6. **Grant Camera Permissions**
   - On Android, add permissions in `AndroidManifest.xml`.
   - On iOS, add permissions in `Info.plist`.

---

## 📜 License
This project is licensed under the MIT License.

---

🚀 **Happy Coding!**


- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
