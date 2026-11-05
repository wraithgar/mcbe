# Durability Viewer

This is a behavior pack for [bedrock server](https://www.minecraft.net/en-us/download/server/bedrock) that adds durability numbers to the tools in your main hand.

## Installation

- Copy the `durability_viewer/` directory from `behavior_packs/` and put it in the `behavior_packs/` folder of your server
- Copy the `7aed1a9f-ad1c-4312-85c2-5bc3ecf7ae82` directory from `config/` and put it in the `config/` folder of your server
- Add the behavior pack to the `world_behavior_packs.json` file in your minecraft world directory:

  ```json
  [
    {
      "pack_id": "07a47fe2-5d2b-4873-9f9d-6660fc2091ed",
      "version": [ 1, 0, 0]
    }
  ]
  ```

  You may need to create this file if it doesn't exist.

- Restart or reload your server to load the new behavior pack.  You should see a line during initialization that looks something like this:

    ```Pack Stack - [00] Durability Viewer (id: 07a47fe2-5d2b-4873-9f9d-6660fc2091ed, version: 1.0.0) @ behavior_packs/durability_viewer```
