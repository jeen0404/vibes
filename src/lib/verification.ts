/**
 * "No-Filter" / Raw Resonance Verification Logic
 * 
 * In a real implementation, this would:
 * 1. Read EXIF/XMP metadata from the uploaded image buffer.
 * 2. Check for software tags (e.g., "Adobe Photoshop", "VSCO").
 * 3. Verify the "Make" and "Model" tags match a mobile device.
 * 4. Ensure "OriginalDate" matches "CreateDate".
 */

export interface VerificationResult {
    isRaw: boolean;
    reason?: string;
    metadata?: Record<string, any>;
}

// Mock function to simulate metadata analysis
export async function verifyRawStatus(file: File): Promise<VerificationResult> {

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log(`Analyzing spectral data for: ${file.name}`);

    // logic: If file name contains "edited", fail it.
    // This allows us to test both states easily in the UI.
    if (file.name.toLowerCase().includes("edited")) {
        return {
            isRaw: false,
            reason: "Spectral interference detected. Modification software signature found.",
        };
    }

    // logic: If file size is too small, assume compression/editing
    if (file.size < 50000) { // < 50kb
        return {
            isRaw: false,
            reason: "Low fidelity signal. Image compression detected.",
        };
    }

    return {
        isRaw: true,
        metadata: {
            device: "iPhone 15 Pro",
            software: "17.2",
            iso: 80,
            shutter: "1/120"
        }
    };
}
