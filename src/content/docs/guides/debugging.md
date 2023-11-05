---
title: Common Issues and Troubleshooting
description: Docs for troubleshooting common Issues.
---

## Check the logs

Whatever issue you are experiencing, the first thing you should do is to check the logs. You can do so by running the following command:

```bash
docker logs cosmos-server
```

You can also check them from Cosmos directly in the Servapp page (if it is still accessible) or from Portainer.

## Change the configs

Everything in Cosmos can be changed from the terminal in case of rescue situation. Simply navigate to your config folder (by default /var/lib/cosmos) and open the file cosmos-config.json. You can change any value in there, and restart the container to apply the changes.

## Issues with the installation of the software

If the installation was unsuccessful for any reason, after checking the logs and resolving your issue, please retry the setup. You can flush all your data by deleting the `cosmos` folder in `/var/lib` and restarting the container. If you had already created a DB you should also delete it in order to start on a clean slate.

If you have already completed the setup and want to do it again, you can go in your config file and change NewInstall to true, then restart the container. This will reset your setup and you will be able to do it again.

## Issues with HTTPS

It is possible that your certificate fails to be automatically renewed by Let's Encrypt. Usual culprits are

* Your domain is not pointing to your server
* One of the subdomains is not pointing to your server (especially if you just added a new URL/app)
* You haven't disabled Cloudflare proxy for your domain / subdomains

If you are using the DNS challenge, you should also check that your tokens are correct. Remember, for Cloudflare you must use either a TOKEN or an API KEY, not both, and make sure they are in the right variable.

When you have such issue, Cosmos will start in HTTP Mode. You can then change your settings, or remove any new URL added that might cause the issue.

## Cannot login / Issues with the database

If you cannot login at all even if you are sure that your credentials are correct, it is highly possible that your database setup is broken. Make sure that

* Your database is up and running, do not hesitate to check the MongoDB logs
* You have setup the correct database setup in the config
* You have the correct credentials for your database

## Issues with Constellation

When debugging Constellation, first and foremost always check the VPN logs in the Constellation tab. The most common reasons for not being able to connect are:

* Your client is using an outdated certificate,try recreating a device from scratch
* Your Cosmos container does not have the port 4242 exposed (**it must be a UDP port!**)
* Your Cosmos container does not have the --privileged flag. If you do not want to give that flag, you can still get Constellation to work by adding the following capabilities: NET_ADMIN
* Make sure you have at least one publicly accessible lighthouse in your network. If you are behind a CGNAT, you can use a $5 DigitalOcean droplet as a lighthouse.
* You cannot run two VPN on the same server. If you are using Wireguard, you must disable it first.

Do not forget to check the logs of the VPN (both on the constellation tab and on your device) for details.
If you see "Failed to get a tun/tap device" it means your server cannot start the VPN at all, which is usually a permission issue (make sure you have the --privileged flag).

if you see an error saying that the port 4242 is busy, restart the app / container it should go away.

If your issue persist, make sure to take the common troubleshooting steps

* Restart the VPN (Constellation tab)
* Restart the Cosmos container
* Restart the client on your device
* Reconnect your devices from scratch (delete the device, create a new one, reconnect)

