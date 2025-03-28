import React, { useRef, useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert,TouchableOpacity, SafeAreaView, ScrollView,StatusBar,useColorScheme } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import Mlkitocr from 'react-native-mlkit-ocr';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);
  const [productName, setProductName] = useState('');

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'qr', 'code-128'],
    onCodeScanned: (codes) => {
      if (!scanned && codes.length > 0) {
        setScanned(true);
        console.log('Scanned Barcode:', codes[0].value);
        fetchProductByBarcode(codes[0].value ?? '');
      }
    }
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>No Camera Permission</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>Camera not available</Text>
      </View>
    );
  }

  // Fetch product details using barcode
  const fetchProductByBarcode = async (barcode: string) => {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.product) {
        throw new Error('Product not found');
      }

      const fetchedProductName = data.product.product_name || 'Unknown Product';
      setProductName(fetchedProductName);

      // Speak out the product name
      Tts.speak(`Product name is ${fetchedProductName}`);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProductName('Error fetching product');
      Tts.speak('Error fetching product');
    }
  };

  // Capture image and process OCR
  const captureImage = async () => {
    if (!camera.current) return;

    try {
      const photo = await camera.current.takePhoto();
      const imagePath = `file://${photo.path}`;
      setImageUri(imagePath);
      console.warn('Captured Image Path:', imagePath);
      // Process OCR
      const mlkitocrresult = await Mlkitocr.detectFromUri(imagePath);
      console.warn('OCR Result:', mlkitocrresult);

      if (mlkitocrresult.length > 0) {
        const text = mlkitocrresult.map(block => block.text).join('\n');
        setRecognizedText(text);
        // Speak out the recognized text
        Tts.speak(`Recognized text is: ${text}`);
      } else {
        setRecognizedText('No text detected.');
        Tts.speak('No text detected.');
      }
    } catch (error) {
      console.error('OCR Error:', error);
      Alert.alert('Error', 'Failed to process OCR.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.header}>ShopAssist</Text>
      <View >
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        codeScanner={codeScanner} 
      />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Icon name="barcode-scan" size={20} color="#000000" />
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Icon name="format-text" size={24} color="#000" />
          <Text style={styles.buttonText}>Recognize Text</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.infoBox} nestedScrollEnabled><Text style={styles.infoText}>OCR: {recognizedText}</Text></ScrollView>
      <ScrollView style={styles.infoBox} nestedScrollEnabled><Text style={styles.infoText}>Product Name: {productName}</Text></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 22, color: 'white', fontWeight: 'bold', marginBottom: 10, fontFamily: 'Montserrat-Bold' },
  camera: {  borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 300 ,borderColor: '#000', borderStyle: 'solid', borderWidth: 2},
  text: { padding: 10, fontSize: 16, fontWeight: 'bold', fontFamily: 'Montserrat-Regular' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  button: {flexDirection:'row', width: 150, height: 50, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, borderColor: '#000', borderStyle: 'solid', borderWidth: 2 },
  buttonText: { fontSize: 16, fontWeight: 'bold', fontFamily:'Montserrrat-Regular' },
  infoBox: { backgroundColor: '#9f9f9f',height:100, padding: 10, borderRadius: 10, marginVertical: 5,borderColor: '#000', borderStyle: 'solid', borderWidth: 2 },
  infoText: { fontSize: 16, fontWeight: 'bold' }
});

