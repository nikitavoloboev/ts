-- is good to have for the cli utility I use to reload config
require("hs.ipc")

-- reload config from a hotkey
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "U", function()
  hs.reload()
end)

-- show my todo task in a neat window briefly
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "I", function()
hs.alert.show( ( hs.execute("~/Documents/app/bitbar/todo") ) )
end)

-- not sure about this
hs.alert.show("config loaded")


