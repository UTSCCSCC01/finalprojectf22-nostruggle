---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
author: "Team NoStruggle"
menu: 
    main: 
        title: "{{ replace .Name "-" " " | title }}"
        parent: 'about'
        weight: 1
---

-Replace this with page text-