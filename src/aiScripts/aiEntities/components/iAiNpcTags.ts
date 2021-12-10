/**
 * @interface IAiNpcTags
 * Contains a lookup table of tags for each npc. The tags are used to flag npc's for specific events like
 * world state changes.
 * @field tags simple lookup table that maps a tag to an boolean. If the npc contains a tag, it will map to true, otherwise undefined
 */
export interface IAiNpcTags {
    tags: Map<string, boolean>
}

export const LIVES_IN_TOWN_TAG : string = "lives in town"

