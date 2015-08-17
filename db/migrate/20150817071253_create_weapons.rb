class CreateWeapons < ActiveRecord::Migration
  def self.up
    create_table :weapons do |t|
      t.string :name
      t.integer :price
      t.integer :attack
      t.integer :speed
      t.integer :range
      t.references :zombie
      t.references :weapon_type
    end
  end

  def self.down
    drop_table :weapons
  end
end
