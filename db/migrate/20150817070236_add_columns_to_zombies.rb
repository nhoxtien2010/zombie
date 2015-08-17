class AddColumnsToZombies < ActiveRecord::Migration
  def self.up
    add_column :zombies, :gold, :integer
    add_column :zombies, :attack, :integer
    add_column :zombies, :speed, :integer
    add_column :zombies, :defence, :integer
  end

  def self.down
    remove_column :zombies, :defence
    remove_column :zombies, :speed
    remove_column :zombies, :attack
    remove_column :zombies, :gold
  end
end
