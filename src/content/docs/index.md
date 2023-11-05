---
title: Cosmos Documentation
description: Docs for the Cosmos Cloud.
---

Welcome to the Cosmos documentation. In order to get started, please make sure you have installed and properly setup Docker on your server: https://docs.docker.com/engine/installation/

## Start Cosmos

Installation is simple using Docker:

```
docker run -d -p 80:80 -p 443:443 -p 4242:4242/udp --privileged --name cosmos-server -h cosmos-server --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v /:/mnt/host -v /var/lib/cosmos:/config azukaar/cosmos-server:latest
```

if you do not have docker installed, you can first easily install it this way on Linux, or with the [official documentation](https://docs.docker.com/engine/installation/) for windows.

Linux command:

```
curl -fsSL https://get.docker.com | sudo sh
```

Once installed, simply go to `http://your-server-ip` and follow the instructions of the setup wizard.

Make sure you expose the right ports (by default 80 / 443). It is best to keep those ports intact, as Cosmos is meant to run as your reverse proxy. Trying to setup Cosmos behind another reverse proxy is possible but will only create headaches.

You also need to keep the docker socket mounted, as Cosmos needs to be able to manage your containers. Don't expect to be able to run this container as non-root.

If you want to use Docker Compose:

```
version: '3.3'
services:
    cosmos-server:
        ports:
            - '80:80'
            - '443:443'
            - '4242:4242/udp'
        container_name: cosmos-server
        hostname: cosmos-server
        restart: always
        privileged: true # Required for SELinux
        volumes:
            - '/var/run/docker.sock:/var/run/docker.sock'
            - '/var/lib/cosmos:/config'
            - '/:/mnt/host'
        image: 'azukaar/cosmos-server:latest'
```

## Compatibility

Cosmos-Server is compatible with AMD64 and ARM64 architectures (both your OS and CPU have to be 64bits). If you are using a Raspberry Pi, you need at least a Raspberry Pi 3 or Zero 2 W. Once again, check you are using a 64bits OS.

## Other settings

in this command, `-v /:/mnt/host` is optional and allow to manage folders from Cosmos, you can remove it if you don't want it but you will have to create your container's bind folders manually.

`--privileged` is also optional, but it is required if you use hardening software like AppArmor or SELinux, as they restrict access to the docker socket. It is also required for Constellation to work. If you don't want to use it, you can add the following capabilities: NET_ADMIN for Constellation.

You can change the destination folder of the config file by changing the `-v /var/lib/cosmos:/config` part of the command. You can also change the name of the container by changing the `--name cosmos-server` part of the command.

If you are running a Raspberry or another ARM based server, you can use `latest-arm64` for an arm architecture image.

Port 4242 is a UDP port used for the Constellation VPN.

Finally, if you are using Cosmos from one of the countries considered "high risk," you can prevent Cosmos from blocking your IP by adding the following environment variable to your Docker run command: `-e COSMOS_SERVER_COUNTRY=IN`. Replace "IN" with your country code. The following countries are blocked by default: China (CN), Russia (RU), Turkey (TR), Brazil (BR), Bangladesh (BD), India (IN), Nepal (NP), Pakistan (PK), Sri Lanka (LK), Vietnam (VN), Indonesia (ID), Iran (IR), Iraq (IQ), Egypt (EG), Afghanistan (AF), and Romania (RO). Please note that this choice is neither political nor personal; it is solely based on past attack statistics. If you are from one of these countries and want to use Cosmos, we sincerely apologize for the inconvenience. If you are having issues with this, please contact us on Discord!

You can tweak the config file accordingly. Some settings can be changed before end with env var. [See here](https://cosmos-cloud.io/doc/9%20Other%20Setups/#env-var).

if you are having issues with the installation, please contact us on [Discord](https://discord.gg/PwMWwsrwHA)!

## Your first ServApp

In Cosmos, Servapps are the applications running on your server. In reality they represent Docker containers (or mini virtual machines, for complete isolation). They are the building blocks of your server.

You can install them in many ways:

* From the Cosmos App Store (the Market tab on the left)
* From the create Servapp form (The Create Servapp button on the servapp tab)
* From the import compose function (the Import Compose button on the servapp tab)
* From the command line (using docker CLI)
* From any other application (ex. Portainer)

Once created, the servapp will appear in the servapp tab. You can then click on it to access its settings.

There is a "New +" button in the URL sub-category of your servapps. that's where you can create new URLs for your servapp. Those URLs will allow you to access your servapp through Cosmos' proxy. Click on it, and you will be greated with a mostly pre-configured form. Check that all is fine, and click on "Create URL" to create your URL. After restart, your URL will appear on the home page.

## Licence

Cosmos is using the Apache 2.0 Licence with the Commons Clause 1.0. This is a common clause among open source infrastructure software, such as databases, reverse proxies, etc...

The TL;DR is: You can use it freely. You can also fork it and redistribute it, But you are not allowed to sell it, a derivative or to sell a service based on it (ex. SaaS or PaaS).

Note that **you are allowed** to use it to host a monetized business website, a blog etc... as long as your business does not involve selling Cosmos or its features.

## Backups

Cosmos exports all your containers in a single file in the config folder (by default `/var/lib/cosmos`), you can use this file to restore your server in case of a crash. You can also use it to migrate your server to another machine.