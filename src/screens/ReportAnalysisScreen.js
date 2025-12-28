import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ReportAnalysisScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setResult(null); // Reset previous result
        }
    };

    const handleAnalyze = () => {
        if (!image) return;

        setAnalyzing(true);
        // Mock Analysis
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                summary: "Complete Blood Count (CBC) Report",
                abnormalities: [
                    { parameter: "Hemoglobin", value: "11.5 g/dL", status: "Low", context: "Mild Anemia" },
                    { parameter: "WBC", value: "11,000 /cumm", status: "High", context: "Possible Infection" }
                ],
                advice: "Consult a general physician for the slight infection indicated."
            });
        }, 2500);
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Analyze Report</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Image Placeholder / Selected Image */}
                <View style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderBox}>
                            <Ionicons name="cloud-upload-outline" size={50} color={COLORS.textSecondary} />
                            <Text style={styles.placeholderText}>Tap below to upload a medical report</Text>
                        </View>
                    )}
                </View>

                {/* Actions */}
                <View style={styles.actionRow}>
                    <CustomButton
                        title={image ? "Change Photo" : "Upload Photo"}
                        onPress={pickImage}
                        variant="outline"
                        style={{ flex: 1, marginRight: 10 }}
                    />
                    {image && (
                        <CustomButton
                            title={analyzing ? "Scanning..." : "Analyze"}
                            onPress={handleAnalyze}
                            isLoading={analyzing}
                            style={{ flex: 1, marginLeft: 10 }}
                        />
                    )}
                </View>

                {/* Analysis Result */}
                {result && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.sectionTitle}>Analysis Result</Text>

                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>{result.summary}</Text>
                            <View style={styles.divider} />

                            {result.abnormalities.map((item, index) => (
                                <View key={index} style={styles.abnormalRow}>
                                    <Ionicons name="alert-circle" size={20} color={COLORS.warning} />
                                    <View style={{ marginLeft: 10, flex: 1 }}>
                                        <Text style={styles.parameterText}>{item.parameter}: {item.value}</Text>
                                        <Text style={styles.contextText}>{item.status} - {item.context}</Text>
                                    </View>
                                </View>
                            ))}

                            <View style={styles.adviceBox}>
                                <Text style={styles.adviceText}>💡 {result.advice}</Text>
                            </View>
                        </View>

                        <CustomButton
                            title="Ask AI Doctor about this"
                            variant="outline"
                            onPress={() => navigation.navigate('AIChat')}
                            style={{ marginTop: 15 }}
                        />
                    </View>
                )}

            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    content: {
        padding: SIZES.padding,
    },
    imageContainer: {
        height: 250,
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        marginBottom: 20,
    },
    placeholderBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    placeholderText: {
        marginTop: 10,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    actionRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    resultContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 15,
    },
    summaryCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: 20,
        ...SHADOWS.medium,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: 15,
    },
    abnormalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    parameterText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    contextText: {
        fontSize: 14,
        color: COLORS.danger,
    },
    adviceBox: {
        backgroundColor: '#FFF9C4',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    adviceText: {
        color: '#AFB42B', // Darker yellow/olive
        fontWeight: '600',
    }
});
