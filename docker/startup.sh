if [ ! "$(docker network ls | grep lw-hub-meeting-clickup-sync-rnd-network)" ]; then
  echo "Creating lw-hub-meeting-clickup-sync-rnd-network network ..."
  docker network create --driver bridge lw-hub-meeting-clickup-sync-rnd-network
else
  echo "lw-hub-meeting-clickup-sync-rnd-network network exists."
fi
