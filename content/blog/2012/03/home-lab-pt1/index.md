---
title: 'vSphere 5 Home Lab Part 1: Introduction and Hardware'
date: '2012-03-26T17:12-0500'
readtime: 5 min
author: Bud Byrd
coverPhoto: ./cover.jpg
---

I've recently had aspirations to study and take the VCP 5 exam, and while reading material and doing sample tests is helpful, there's nothing like having your own lab environment to play around and tinker with.  I didn't want to dump a whole lot of money into a powerful server with network storage, however.

With the release of vSphere 5, ESXi now makes it very easy to take virtualization to the next level by running ESXi as a VM guest.  This allows you set up an entire virtualized infrastructure, including virtualized storage via iSCSI and NFS, and as many hypervisors as your hardware can support.


The goals for my lab setup were as follows:

* Hardware must be cheap but high quality.
* ESXi must support all the hardware, and visa versa.
* Provide virtual, simulated network storage.
* Support a clustered, balanced vSphere environment.

I know bullet item number 2 may seem obvious, but it never hurts to do a little research before buying hardware.  It's always a good idea to check the supported hardware list on VMware's site, but a simple google search sufficed in order to check if the hardware I was thinking about buying would work.

Here's the hardware I ended up going with:

* [ASUS P8H61-M LX Plus Micro-ATX motherboard](http://www.newegg.com/Product/Product.aspx?Item=N82E16813131793)
* [Intel Core i3-2100 3.1Ghz Sandy Bridge Dual-Core processor](http://www.newegg.com/Product/Product.aspx?Item=N82E16819115078)
* [G.Skill Ripjaw X Series 16GB (2x8GB) DDR3 memory](http://www.newegg.com/Product/Product.aspx?Item=N82E16820231486)
* [Apevia X-QPack Black case with 420W PSU](http://www.newegg.com/Product/Product.aspx?Item=N82E16811144162)
* 1TB Western Digital Black HD
* 160GB Western Digital Black HD

In order to support 64-bit guests, it is crucially important that the CPU support Intel VT, if you are using Intel processors.  The case is about a square foot in size, so the physical footprint of the lab box is small enough to stick on a shelf or put in a corner.  16 gigs fills up both memory slots on the board, so I have plenty of memory to run several decent sized guests.  The motherboard provides one 1Gb ethernet port, which is all we need for real network connectivity (we'll set up private virtual switches for features like vMotion that never touch a real network).  The motherboard also provides a VGA output courtesy of the onboard graphics of the CPU, which saves me some money from not having to buy a small video card.

For hard drive space, I'm not doing anything fast or fancy.  I will install the hypervisors, vCenter, and simulated storage on the 160GB drive, and make the 1TB drive my VM storage.  I had the 160GB laying around the house, but had to buy the 1TB.

The cost for all this hardware came out to $540.  I could have probably gotten the price down by going with lesser brand or refurbished hardware, but longevity is important to me and I trust these brands.

I won't go into details on how to put this hardware together, as building a system is quite easy.  In my next article, I'll go into detail about how to prepare the hardware for ESXi, and how to install and configure ESXi.
