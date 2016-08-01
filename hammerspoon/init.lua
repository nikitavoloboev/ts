hs.hotkey.bind({"cmd", "alt", "ctrl"}, "I", function()
  hs.alert.show("hello there")
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "U", function()
  hs.reload()
end)
hs.alert.show("config loaded")
