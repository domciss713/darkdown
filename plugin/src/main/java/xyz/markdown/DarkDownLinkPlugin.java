package xyz.darkdown;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Random;

public class DarkDownLinkPlugin extends JavaPlugin {

    private static final String LINK_ENDPOINT = "https://darkdown.xyz/api/link/claim";

    @Override
    public void onEnable() {
        getLogger().info("DarkDownLink enabled");
    }

    @Override
    public void onDisable() {
        getLogger().info("DarkDownLink disabled");
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!command.getName().equalsIgnoreCase("link")) return false;
        if (!(sender instanceof Player player)) {
            sender.sendMessage("Only players may use this command.");
            return true;
        }

        String code = generateCode();
        player.sendMessage(" ");
        player.sendMessage("§5§lDarkDowN account link");
        player.sendMessage("§7Open §dhttps://darkdown.xyz/me§7 in your browser.");
        player.sendMessage("§7Login with Discord and enter this code:");
        player.sendMessage("§d§l" + code);
        player.sendMessage(" ");

        // Plugin only shows the code. Website associates code with user via /api/link/request.
        // Optional: send async claim for preview log (uuid, name, code) without user binding.
        getServer().getScheduler().runTaskAsynchronously(this, () -> {
            try {
                sendPreview(player.getUniqueId().toString(), player.getName(), code);
            } catch (Exception e) {
                getLogger().warning("Failed to send preview link: " + e.getMessage());
            }
        });

        return true;
    }

    private String generateCode() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        Random r = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(r.nextInt(chars.length())));
        }
        return sb.toString();
    }

    private void sendPreview(String uuid, String name, String code) throws Exception {
        URL url = new URL(LINK_ENDPOINT);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(3000);
        conn.setReadTimeout(3000);
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");

        String body = "{\"uuid\":\"" + uuid + "\",\"name\":\"" + name + "\",\"code\":\"" + code + "\"}";
        byte[] out = body.getBytes(StandardCharsets.UTF_8);
        conn.getOutputStream().write(out);
        conn.getOutputStream().flush();
        conn.getOutputStream().close();

        int status = conn.getResponseCode();
        if (status != 200) {
          getLogger().info("Preview link returned HTTP " + status);
        }
        conn.disconnect();
    }
}
