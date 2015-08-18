class CreateEquips < ActiveRecord::Migration
  def self.up
    create_table :equips do |t|
      t.integer :zombie_id
      t.integer :weapon_id

      t.timestamps
    end
  end

  def self.down
    drop_table :equips
  end
end
