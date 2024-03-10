// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_crypt;

// Learn more about Tauri commands at
// https://tauri.app/v1/guides/features/command

#[tauri::command]
fn encrypt(filepath: &str) -> String {
    if let Err(error) = file_crypt::encrypt(filepath) { error }
    else {
        format!("Your file has been successfully encrypted!")
    }
}

#[tauri::command]
fn decrypt(filepath: &str) -> String {
    if let Err(error) = file_crypt::decrypt(filepath) { error }
    else {
        format!("Your file has been successfully decrypted!")
    }
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![encrypt, decrypt])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
