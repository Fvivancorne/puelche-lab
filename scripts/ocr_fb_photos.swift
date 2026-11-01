import Cocoa
import Vision
import Foundation

let galleryPath = "/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/public/images/real/facebook/gallery"
let fm = FileManager.default

guard let files = try? fm.contentsOfDirectory(atPath: galleryPath).filter({ $0.hasSuffix(".jpg") }).sorted() else {
    print("Cannot read directory")
    exit(1)
}

print("Found \(files.count) jpg files to scan with Apple Vision OCR...")

struct OCRResult: Codable {
    let file: String
    let text: String
}

var results: [OCRResult] = []

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.usesLanguageCorrection = true

for (idx, file) in files.enumerated() {
    let url = URL(fileURLWithPath: "\(galleryPath)/\(file)")
    guard let img = NSImage(contentsOf: url),
          let cgImg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        continue
    }

    let handler = VNImageRequestHandler(cgImage: cgImg, options: [:])
    try? handler.perform([request])

    guard let observations = request.results else { continue }
    let recognizedStrings = observations.compactMap { $0.topCandidates(1).first?.string }
    let fullText = recognizedStrings.joined(separator: " ")

    if !fullText.isEmpty {
        results.append(OCRResult(file: file, text: fullText))
    }

    if (idx + 1) % 50 == 0 || idx == files.count - 1 {
        print("Scanned \(idx + 1)/\(files.count)... Recognized with text: \(results.count)")
    }
}

let outUrl = URL(fileURLWithPath: "/Users/felipeandresvivancocornejo/Documents/GitHub/puelche-lab/scripts/ocr_results.json")
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
if let data = try? encoder.encode(results) {
    try? data.write(to: outUrl)
    print("Saved OCR results to \(outUrl.path)")
}
