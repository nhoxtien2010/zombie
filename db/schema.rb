# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20150818095629) do

  create_table "brains", :force => true do |t|
    t.integer "zombie_id"
    t.string  "status"
    t.string  "flavor"
  end

  add_index "brains", ["zombie_id"], :name => "index_brains_on_zombie_id"

  create_table "equips", :force => true do |t|
    t.integer  "zombie_id"
    t.integer  "weapon_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "supports", :force => true do |t|
    t.string  "name"
    t.integer "price"
    t.integer "attack"
    t.integer "speed"
    t.integer "defence"
    t.integer "zombie_id"
  end

  create_table "tweets", :force => true do |t|
    t.string   "status"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "zombie_id"
  end

  create_table "weapon_types", :force => true do |t|
    t.string "name"
    t.string "note"
  end

  create_table "weapons", :force => true do |t|
    t.string  "name"
    t.integer "price"
    t.integer "attack"
    t.integer "speed"
    t.integer "range"
    t.integer "weapon_type_id"
  end

  create_table "zombies", :force => true do |t|
    t.string   "name"
    t.text     "bio"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "rotting",    :default => false
    t.integer  "gold"
    t.integer  "attack"
    t.integer  "speed"
    t.integer  "defence"
    t.string   "password"
    t.date     "birthday"
  end

end
