use std::path::Path;
use simple_crypt::{encrypt_file, decrypt_file};

const SECRET_KEY: &'static str = "BlackNightBrightLight&Dawn";

pub fn encrypt(file_path: &str) -> Result<(), String>{
    let input_file = Path::new(file_path);

    if let Ok(_) = encrypt_file(
        input_file,
        Path::new(&format!("{file_path}.efo")),
        SECRET_KEY.as_bytes()
    ) { Ok(()) }
    else {
        Err("Failed to encrypt the file!".to_string())
    }
}

pub fn decrypt(file_path: &str) -> Result<(), String>{
    let input_file = Path::new(file_path);

    // Trims the trailing `.efo`
    let output_file: &str = &file_path[0..file_path.len() - 3];

    if let Ok(_) = decrypt_file(
        input_file,
        Path::new(&format!("{output_file}")),
        SECRET_KEY.as_bytes()
    ) { Ok(()) }
    else {
        Err("Failed to decrypt the file!".to_string())
    }
}