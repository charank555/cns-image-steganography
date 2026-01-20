const DELIMITER = "1111111111111110"; // 16-bit end marker

function textToBinary(text) {
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    binary += text.charCodeAt(i).toString(2).padStart(8, "0");
  }
  return binary + DELIMITER;
}

function binaryToText(binary) {
  let result = "";
  for (let i = 0; i < binary.length; i += 8) {
    let byte = binary.substr(i, 8);

    // stop if delimiter starts
    if (binary.substr(i, DELIMITER.length) === DELIMITER) break;

    result += String.fromCharCode(parseInt(byte, 2));
  }
  return result;
}
