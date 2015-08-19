class Cloth < ActiveRecord::Base
  belongs_to :zombie
  belongs_to :support
end
