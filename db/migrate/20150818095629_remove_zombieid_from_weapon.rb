class RemoveZombieidFromWeapon < ActiveRecord::Migration
  def self.up
    remove_column :weapons, :zombie_id
  end

  def self.down
    add_column :weapons, :zombie_id, :integer
  end
end
