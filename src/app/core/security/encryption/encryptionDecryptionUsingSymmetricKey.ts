import * as CryptoJS from 'crypto-js';

export class EncryptionDecryptionUsingSymmetricKey {
  public static encrypt(key: any, value: any) {
    key = CryptoJS.enc.Utf8.parse(key);
    let ciphertext = CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
    return ciphertext;
  }

  public static decrypt(key: any, input: any) {
    var packet = CryptoJS.enc.Base64.parse(input);

    // helpers to compute for offsets
    var PROTOCOL_AES256 = 2;
    var secret_key = CryptoJS.SHA256(key);
    var header = this.toWordArray("AMAZON" + String.fromCharCode(PROTOCOL_AES256));
    var iv = CryptoJS.lib.WordArray.random(16);

    // compute for offsets
    var packet_size = packet.words.length - (iv.words.length + header.words.length);
    var start = iv.words.length + header.words.length;
    var end = packet.words.length;

    var ciphertext = CryptoJS.lib.WordArray.create(packet.words.slice(start, end));
    var parsed_iv = CryptoJS.lib.WordArray.create(packet.words.slice(header.words.length, iv.words.length + 1));
    ciphertext = this.toBase64String(ciphertext);
    var decrypted = CryptoJS.AES.decrypt(ciphertext, secret_key, { iv: parsed_iv });

    return this.toString(decrypted);
  }

  static toWordArray(str: string) {
    return CryptoJS.enc.Utf8.parse(str);
  }

  static toString(words: any) {
    return CryptoJS.enc.Utf8.stringify(words);
  }

  static toBase64String(words: any) {
    return CryptoJS.enc.Base64.stringify(words);
  }
}
