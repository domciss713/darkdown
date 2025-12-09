DarkDownLink Spigot plugin

Features
- Command /link
- Generates a 6 character code
- Instructs player to open https://darkdown.xyz/me and enter the code
- Optionally calls the API endpoint to log preview information

Build
1. Install Java 17 and Gradle
2. Run gradle build
3. Copy build/libs/DarkDownLink-1.0.0.jar to your plugins folder
4. Restart the server

Configuration
- If your panel requires HTTP proxy, adjust LINK_ENDPOINT in the Java class
