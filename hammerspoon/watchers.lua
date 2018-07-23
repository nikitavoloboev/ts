-- Watch events and make actions based on events.

-- WiFi watcher
wifiwatcher =
    hs.wifi.watcher.new(
    function()
        net = hs.wifi.currentNetwork()
        if net == nil then
            hs.notify.show("WiFi disconnected", "", "", "")
        else
            hs.notify.show("WiFi connected", "", net, "")
        end
    end
)
wifiwatcher:start()

