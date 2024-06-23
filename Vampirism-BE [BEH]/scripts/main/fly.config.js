//Code created by @pedro_denovo
//Do not repost this addon directly for download. However, it is allowed to package the configured API together with the addon, as long as it is used as specified.
//To use this addon in your behavior pack, add the following code in the dependencies:

//"dependencies": [
//    {
//        "uuid": "f2179d0b-33ed-4e3c-99b5-f818bf86a1ec",
//        "version": [1, 0, 0]
//    },
//    {
//    ...
//    }
//]

export const config = {
    "fly_system_version": "1.0",
    //Do not change this

    "fly_mode": "hold_jump_and_tag",
    //Fly when holding the jump button ("fly_mode":"hold_jump")
    //Fly when holding the jump button and having a tag ("fly_mode":"hold_jump_and_tag")
    //Fly with item equipped in hand ("fly_mode":"on_item")
    //Fly with item equipped in hand and having a tag ("fly_mode":"on_item_and_tag")
    //Fly with item equipped in the off-hand or armor slot ("fly_mode":"on_item_equip")

    "fly_item": "sunrise:fly_ring",
    //Specify the item ID for when "fly_mode" involves an item

    "fly_tag": "bat_mayfly",
    //Specify the tag ID for when "fly_mode" involves a tag

    "fly_just_on_hold_jump": false,
    //Fly only if the jump button is held / if false it flies more like creative mode

    "fly_fall": false,
    //Fall when stationary

    "fly_speed": 1.2
    //Flight speed

    //Specify the duration of the animation in seconds for the correct loop function
    //"idle_fly_animation": {"name":"animation_name","length":0},
    //Animation played when the player is stationary

    //"flying_animation": {"name":"animation_name","length":0}
    //Animation played when the player is flying
}