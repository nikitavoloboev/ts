ps -eo pid,pmem,rss,command | grep -i "[C]ursor" | awk '
BEGIN { total = 0; }
{
  # Extract window title if present
  if (match($0, /vscode:[a-f0-9-]+/) && match($0, /--vscode-window-config=vscode:[a-f0-9-]+/)) {
    window_id = substr($0, RSTART+21, RLENGTH-21);

    # Look for window title in the next few lines
    for (i=1; i<=NF; i++) {
      if ($i ~ /--/) {
        title = $(i-1);
        if (title ~ /vscode-window-config/) {
          title = "Unknown";
        }
        break;
      }
    }

    # Add memory to the window total
    if (!(window_id in windows)) {
      windows[window_id] = 0;
      titles[window_id] = title;
    }
    windows[window_id] += $3;  # RSS value in KB
  } else {
    # For processes without window ID, add to "shared"
    shared += $3;
  }

  # Keep track of total memory
  total += $3;
}
END {
  # Print the results in a table format
  printf "%-40s %10s %10s\n", "Window Title", "Memory (MB)", "Percentage";
  printf "%-40s %10s %10s\n", "------------", "----------", "----------";

  for (id in windows) {
    mb = windows[id]/1024;
    percent = (windows[id]/total)*100;
    printf "%-40s %10.2f %10.2f%%\n", titles[id], mb, percent;
  }

  # Print shared memory
  mb = shared/1024;
  percent = (shared/total)*100;
  printf "%-40s %10.2f %10.2f%%\n", "Shared processes", mb, percent;

  # Print total
  mb = total/1024;
  printf "%-40s %10.2f %10s\n", "Total", mb, "100.00%";
}'
